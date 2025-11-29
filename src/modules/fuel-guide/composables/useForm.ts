import { IntensityType } from "@/modules/fuel-guide/interfaces/Intensity";
import { PlaceType } from "@/modules/fuel-guide/interfaces/Place";
import { SportType } from "@/modules/fuel-guide/interfaces/Sport";
import { WeatherType } from "@/modules/fuel-guide/interfaces/Weather";
import { createInjectionState } from "@vueuse/core";
import { reactive } from "vue";

interface Form {
  sport: SportType | null;
  place: PlaceType | null;
  intensity: IntensityType | null;
  weather: WeatherType | null;
  sweat: number;
}

const initialValue: Form = {
  sport: null,
  place: null,
  intensity: null,
  weather: null,
  sweat: 0,
};

const [useProvideForm, useForm] = createInjectionState(() => {
  const state = reactive(initialValue);

  function updateState<Type>(key: keyof Form, value: Type) {
    (state[key] as Type) = value;
  }

  return { state, updateState };
});

export { useForm, useProvideForm };
