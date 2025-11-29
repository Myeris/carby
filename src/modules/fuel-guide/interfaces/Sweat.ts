import { capitalize } from "@vue/shared";
import type { GenericOption } from "./GenericOption";

export enum SweatLevel {
    VeryLow = 'not at all',
    Low = 'a little',
    Medium = 'moderately',
    High = 'a lot',
    VeryHigh = 'it\'s pouring',
}

export type SweatLevelOption = GenericOption<SweatLevel>;

const veryLowOption: SweatLevelOption = {
    id: SweatLevel.VeryLow,
    label: capitalize(SweatLevel.VeryLow),

};
const lowOption: SweatLevelOption = {
    id: SweatLevel.Low,
    label: capitalize(SweatLevel.Low),
};
const mediumOption: SweatLevelOption = {
    id: SweatLevel.Medium,
    label: capitalize(SweatLevel.Medium),
};
const highOption: SweatLevelOption = {
    id: SweatLevel.High,
    label: capitalize(SweatLevel.High),
};
const veryHighOption: SweatLevelOption = {
    id: SweatLevel.VeryHigh,
    label: capitalize(SweatLevel.VeryHigh),
};

export const sweatLevelOptions: SweatLevelOption[] = [veryLowOption, lowOption, mediumOption, highOption, veryHighOption];