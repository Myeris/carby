import { createInjectionState } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';

import type { Form } from '@/modules/fuel-guide/interfaces/Form';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import type { Result } from '@/modules/fuel-guide/interfaces/Result';
import { getCarbsPerHour } from '@/modules/fuel-guide/services/CarbCalculator';
import { getSodiumMgPerHour } from '@/modules/fuel-guide/services/ElectrolyteCalculator';
import { getFluidMlPerHour } from '@/modules/fuel-guide/services/HydrationCalculator';

const initialValue: Form = {
  sport: null,
  place: null,
  intensity: null,
  weather: null,
  sweat: null,
  duration: 0,
  saltCrust: false,
};

const resultId = 'result';
const formId = 'form';

const [useProvideForm, useForm] = createInjectionState(() => {
  const state = reactive<Form>(initialValue);
  const result = reactive<Result>({
    carb: null,
    hydration: null,
    electrolyte: null,
  });
  const isLoading = ref(false);

  const canCalculate = computed(() => {
    return (
      state.sport !== null &&
      state.duration !== null &&
      state.intensity !== null &&
      (state.weather !== null || state.place === PlaceType.Inside) &&
      state.place !== null &&
      state.sweat !== null &&
      state.duration > 0
    );
  });
  const hasResult = computed<boolean>(
    () => result.carb !== null && result.hydration !== null && result.electrolyte !== null,
  );
  const hasNutritionNeeds = computed<boolean>(
    () => (result.carb ?? 0) > 0 || (result.hydration ?? 0) > 0 || (result.electrolyte ?? 0) > 0,
  );

  function updateState<Type>(key: keyof Form, value: Type) {
    (state[key] as Type) = value;
  }

  function calculate() {
    isLoading.value = true;

    result.carb = getCarbsPerHour({
      sport: state.sport!,
      durationMin: state.duration!,
      intensity: state.intensity!,
    });
    result.hydration = getFluidMlPerHour({
      sport: state.sport!,
      intensity: state.intensity!,
      weather: state.weather!,
      place: state.place!,
      sweatLevel: state.sweat!,
      saltCrust: state.saltCrust!,
      durationMin: state.duration!,
    });
    result.electrolyte = getSodiumMgPerHour(result.hydration!, {
      sweatLevel: state.sweat!,
      saltCrust: state.saltCrust!,
      durationMin: state.duration!,
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }

  return {
    state,
    result,
    resultId,
    formId,
    isLoading,
    canCalculate,
    hasResult,
    hasNutritionNeeds,
    updateState,
    calculate,
  };
});

export { useForm, useProvideForm };
