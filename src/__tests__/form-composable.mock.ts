import type { Form } from '@/modules/fuel-guide/interfaces/Form.ts';
import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity.ts';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place.ts';
import type { Result } from '@/modules/fuel-guide/interfaces/Result.ts';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport.ts';
import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import type { Reactive, Ref } from 'vue';

export interface UseFormReturn {
  state: Reactive<Partial<Form>>;
  result: Reactive<Partial<Result>>;
  resultId: string;
  formId: string;
  isLoading: Ref<boolean>;
  canCalculate: Ref<boolean>;
  hasResult: Ref<boolean>;
  hasNutritionNeeds: Ref<boolean>;
  updateState<Type>(key: keyof Form, value: Type): void;
  calculate(): void;
}

export const calculableFormMock: Form = {
  sport: SportType.Cycling,
  place: PlaceType.Inside,
  intensity: IntensityType.Hard,
  weather: null,
  sweat: SweatLevel.High,
  duration: 90,
  saltCrust: false,
};
