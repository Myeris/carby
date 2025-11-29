import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';

import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport';
import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat';
import { WeatherType } from '@/modules/fuel-guide/interfaces/Weather';
import { useProvideForm } from './useForm';

const serviceSpies = vi.hoisted(() => ({
  carbsSpy: vi.fn(() => 90),
  hydrationSpy: vi.fn(() => 1200),
  electrolytesSpy: vi.fn(() => 600),
}));

vi.mock('@/modules/fuel-guide/services/CarbCalculator', () => ({
  getCarbsPerHour: serviceSpies.carbsSpy,
}));

vi.mock('@/modules/fuel-guide/services/HydrationCalculator', () => ({
  getFluidMlPerHour: serviceSpies.hydrationSpy,
}));

vi.mock('@/modules/fuel-guide/services/ElectrolyteCalculator', () => ({
  getSodiumMgPerHour: serviceSpies.electrolytesSpy,
}));

const ProviderHarness = defineComponent({
  setup(_, { expose }) {
    const api = useProvideForm();
    expose({ api });
    return () => null;
  },
});

describe('useForm', () => {
  beforeEach(() => {
    serviceSpies.carbsSpy.mockClear();
    serviceSpies.hydrationSpy.mockClear();
    serviceSpies.electrolytesSpy.mockClear();
  });

  it('requires all fields to enable calculation and handles indoor workouts', async () => {
    const wrapper = mount(ProviderHarness);

    const { api } = wrapper.vm as unknown as { api: ReturnType<typeof useProvideForm> };

    expect(api.canCalculate.value).toBe(false);

    api.state.sport = SportType.Running;
    api.state.place = PlaceType.Outside;
    api.state.weather = WeatherType.Hot;
    api.state.intensity = IntensityType.Hard;
    api.state.sweat = SweatLevel.High;
    api.state.duration = 95;
    await nextTick();

    expect(api.canCalculate.value).toBe(true);

    api.state.place = PlaceType.Inside;
    api.state.weather = null;
    await nextTick();

    expect(api.canCalculate.value).toBe(true);
  });

  it('calculates recommendations, exposes result flags, and toggles loading state', async () => {
    vi.useFakeTimers();

    const wrapper = mount(ProviderHarness);
    const { api } = wrapper.vm as unknown as { api: ReturnType<typeof useProvideForm> };

    api.state.sport = SportType.Cycling;
    api.state.place = PlaceType.Outside;
    api.state.weather = WeatherType.Mild;
    api.state.intensity = IntensityType.Moderate;
    api.state.sweat = SweatLevel.Medium;
    api.state.duration = 120;
    api.state.saltCrust = true;
    await nextTick();

    api.calculate();

    expect(api.isLoading.value).toBe(true);
    expect(serviceSpies.carbsSpy).toHaveBeenCalledWith({
      sport: SportType.Cycling,
      durationMin: 120,
      intensity: IntensityType.Moderate,
    });
    expect(serviceSpies.hydrationSpy).toHaveBeenCalledWith({
      sport: SportType.Cycling,
      intensity: IntensityType.Moderate,
      weather: WeatherType.Mild,
      place: PlaceType.Outside,
      sweatLevel: SweatLevel.Medium,
      saltCrust: true,
      durationMin: 120,
    });
    expect(serviceSpies.electrolytesSpy).toHaveBeenCalledWith(1200, {
      sweatLevel: SweatLevel.Medium,
      saltCrust: true,
      durationMin: 120,
    });

    vi.runAllTimers();
    await nextTick();

    expect(api.isLoading.value).toBe(false);
    expect(api.result.carb).toBe(90);
    expect(api.result.hydration).toBe(1200);
    expect(api.result.electrolyte).toBe(600);
    expect(api.hasResult.value).toBe(true);
    expect(api.hasNutritionNeeds.value).toBe(true);

    vi.useRealTimers();
  });
});
