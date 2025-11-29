import type { GenericOption } from "@/modules/fuel-guide/interfaces/GenericOption";
import { Bike, Footprints } from "lucide-vue-next";

export enum SportType {
  Running = 'running',
  Cycling = 'cycling',
}

export type SportOption<Icon> = GenericOption<SportType, Icon>;

const bikeOption: SportOption<typeof Bike> = {
  id: SportType.Cycling,
  label: 'Cycling',
  icon: Bike,
}
const runningOption: SportOption<typeof Footprints> = {
  id: SportType.Running,
  label: 'Running',
  icon: Footprints,
};

export const sportOptions: SportOption<typeof Bike | typeof Footprints>[] = [
  runningOption,
  bikeOption,
];