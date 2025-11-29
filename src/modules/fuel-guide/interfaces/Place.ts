import type { GenericOption } from "@/modules/fuel-guide/interfaces/GenericOption";
import { House, Trees } from "lucide-vue-next";
import { capitalize } from "vue";

export enum PlaceType {
  Inside = "inside",
  Outside = "outside",
}

export type PlaceOption<Icon> = GenericOption<PlaceType, Icon>;

const insideOption: PlaceOption<typeof House> = {
  id: PlaceType.Inside,
  label: capitalize(PlaceType.Inside),
  icon: House
};
const outsideOption: PlaceOption<typeof Trees> = {
  id: PlaceType.Outside,
  label: capitalize(PlaceType.Outside),
  icon: Trees
};
export const placeOptions: PlaceOption<typeof House | typeof Trees>[] = [insideOption, outsideOption];