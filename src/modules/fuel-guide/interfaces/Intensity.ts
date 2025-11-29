import type { GenericOption } from "@/modules/fuel-guide/interfaces/GenericOption";
import { BatteryFull, BatteryLow, BatteryMedium } from "lucide-vue-next";
import { capitalize } from "vue";

export enum IntensityType {
  Easy = 'easy',
  Moderate = 'moderate',
  Hard = 'hard',
}

export type IntensityOption<Icon> = GenericOption<IntensityType, Icon>;

const easyOption: IntensityOption<typeof BatteryFull> = {
  id: IntensityType.Easy,
  label: capitalize(IntensityType.Easy),
  icon: BatteryFull
};
const moderateOption: IntensityOption<typeof BatteryMedium> = {
  id: IntensityType.Moderate,
  label: capitalize(IntensityType.Moderate),
  icon: BatteryMedium
};
const hardOption: IntensityOption<typeof BatteryLow> = {
  id: IntensityType.Hard,
  label: capitalize(IntensityType.Hard),
  icon: BatteryLow
};
export const intensityOptions: IntensityOption<typeof BatteryFull | typeof BatteryLow | typeof BatteryLow>[] = [
  easyOption,
  moderateOption,
  hardOption,
];