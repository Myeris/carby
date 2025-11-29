import { describe, expect, it } from 'vitest';

import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity.ts';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place.ts';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport.ts';
import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import { WeatherType } from '@/modules/fuel-guide/interfaces/Weather.ts';
import {
  getFluidMlPerHour,
  type HydrationSessionInput,
} from '@/modules/fuel-guide/services/HydrationCalculator.ts';

describe('HydrationCalculator', () => {
  it('returns zero fluid when duration is below 30 minutes', () => {
    const session: HydrationSessionInput = {
      sport: SportType.Running,
      intensity: IntensityType.Moderate,
      weather: WeatherType.Mild,
      place: PlaceType.Outside,
      sweatLevel: SweatLevel.Medium,
      saltCrust: false,
      durationMin: 20,
    };

    expect(getFluidMlPerHour(session)).toBe(0);
  });

  it('combines temperature and modifiers for outdoor runs', () => {
    const session: HydrationSessionInput = {
      sport: SportType.Running,
      intensity: IntensityType.Moderate,
      weather: WeatherType.Mild,
      place: PlaceType.Outside,
      sweatLevel: SweatLevel.Medium,
      saltCrust: false,
      durationMin: 60,
    };

    // 550 (mild) * 1.0 sweat * 0.9 running * 1.0 intensity * 1.0 outside
    expect(getFluidMlPerHour(session)).toBe(495);
  });

  it('accounts for all multipliers for hot indoor cycling', () => {
    const session: HydrationSessionInput = {
      sport: SportType.Cycling,
      intensity: IntensityType.Hard,
      weather: WeatherType.Hot,
      place: PlaceType.Inside,
      sweatLevel: SweatLevel.High,
      saltCrust: true,
      durationMin: 120,
    };

    // 750 * 1.2 sweat * 1.0 cycling * 1.05 intensity * 1.1 inside
    expect(getFluidMlPerHour(session)).toBe(1040);
  });
});
