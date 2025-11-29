import { round } from 'lodash';

import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport';
import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import { WeatherType } from '@/modules/fuel-guide/interfaces/Weather';

export interface HydrationSessionInput {
  sport: SportType;
  intensity: IntensityType;
  weather: WeatherType;
  place: PlaceType;
  sweatLevel: SweatLevel;
  saltCrust: boolean;
  durationMin: number;
}

/**
 * @param weather
 * @returns Base fluid in mL/h
 */
function baseFluidByTemp(weather: WeatherType): number {
  switch (weather) {
    case WeatherType.Cold:
      return 400;
    case WeatherType.Mild:
      return 550;
    case WeatherType.Hot:
      return 750;
    default:
      return 550; // baseline for indoor workouts
  }
}

function sweatFactor(sweatLevel: SweatLevel): number {
  switch (sweatLevel) {
    case SweatLevel.Low:
      return 0.8;
    case SweatLevel.Medium:
      return 1.0;
    case SweatLevel.High:
      return 1.2;
    default:
      return 1.0;
  }
}

function sportFluidFactor(sport: SportType): number {
  return sport === SportType.Running ? 0.9 : 1.0;
}

function fluidIntensityFactor(intensity: IntensityType): number {
  switch (intensity) {
    case IntensityType.Easy:
      return 0.95;
    case IntensityType.Moderate:
      return 1.0;
    case IntensityType.Hard:
      return 1.05;
  }
}

function environmentFluidFactor(place: PlaceType): number {
  return place === PlaceType.Inside ? 1.1 : 1.0;
}

/**
 * Returns fluid target in mL/h
 */
export function getFluidMlPerHour(session: HydrationSessionInput): number {
  if (session.durationMin < 30) return 0;

  const base = baseFluidByTemp(session.weather);
  const sf = sweatFactor(session.sweatLevel);
  const spf = sportFluidFactor(session.sport);
  const inf = fluidIntensityFactor(session.intensity);
  const env = environmentFluidFactor(session.place);

  return round(base * sf * spf * inf * env);
}
