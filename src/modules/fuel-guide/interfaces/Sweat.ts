import { capitalize } from '@vue/shared';
import { Droplet, DropletOff, Droplets } from 'lucide-vue-next';

import type { GenericOption } from '@/common/components/generic-selector/GenericOption';

export enum SweatLevel {
  Low = 'not that much',
  Medium = 'moderately',
  High = "it's pouring",
}

export type SweatLevelOption<Icon> = GenericOption<SweatLevel, Icon>;

const lowOption: SweatLevelOption<typeof DropletOff> = {
  id: SweatLevel.Low,
  label: capitalize(SweatLevel.Low),
  icon: DropletOff,
};
const mediumOption: SweatLevelOption<typeof Droplet> = {
  id: SweatLevel.Medium,
  label: capitalize(SweatLevel.Medium),
  icon: Droplet,
};
const highOption: SweatLevelOption<typeof Droplets> = {
  id: SweatLevel.High,
  label: capitalize(SweatLevel.High),
  icon: Droplets,
};

export const sweatLevelOptions: SweatLevelOption<typeof DropletOff>[] = [
  lowOption,
  mediumOption,
  highOption,
];
