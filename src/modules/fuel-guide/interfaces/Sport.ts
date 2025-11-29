import { Bike, Footprints } from 'lucide-vue-next';

import type { GenericOption } from '@/common/components/generic-selector/GenericOption';

export enum SportType {
  Running = 'running',
  Cycling = 'cycling',
}

export type SportOption<Icon> = GenericOption<SportType, Icon>;

const bikeOption: SportOption<typeof Bike> = {
  id: SportType.Cycling,
  label: 'Cycling',
  icon: Bike,
};
const runningOption: SportOption<typeof Footprints> = {
  id: SportType.Running,
  label: 'Running',
  icon: Footprints,
};

export const sportOptions: SportOption<typeof Bike | typeof Footprints>[] = [
  runningOption,
  bikeOption,
];
