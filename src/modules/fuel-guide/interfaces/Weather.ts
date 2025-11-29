import type { GenericOption } from "@/modules/fuel-guide/interfaces/GenericOption";
import { Thermometer, ThermometerSnowflake, ThermometerSun } from "lucide-vue-next";
import { capitalize } from "vue";

export enum WeatherType {
  Cold = "cold",
  Mild = "mild",
  Hot = "hot",
}

export type WeatherOption<Icon> = GenericOption<WeatherType, Icon>;

const coldOption: WeatherOption<typeof ThermometerSnowflake> = {
  id: WeatherType.Cold,
  label: capitalize(WeatherType.Cold),
  icon: ThermometerSnowflake
};
const mildOption: WeatherOption<typeof Thermometer> = {
  id: WeatherType.Mild,
  label: capitalize(WeatherType.Mild),
  icon: Thermometer
};
const hotOption: WeatherOption<typeof ThermometerSun> = {
  id: WeatherType.Hot,
  label: capitalize(WeatherType.Hot),
  icon: ThermometerSun
};
export const weatherOptions: WeatherOption<typeof ThermometerSnowflake | typeof Thermometer | typeof ThermometerSun>[] = [coldOption, mildOption, hotOption];