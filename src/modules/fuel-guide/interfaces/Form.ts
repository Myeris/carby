import type { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';
import type { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import type { SportType } from '@/modules/fuel-guide/interfaces/Sport';
import type { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import type { WeatherType } from '@/modules/fuel-guide/interfaces/Weather';

export interface Form {
  sport: SportType | null;
  place: PlaceType | null;
  intensity: IntensityType | null;
  weather: WeatherType | null;
  sweat: SweatLevel | null;
  duration: number;
  saltCrust: boolean;
}
