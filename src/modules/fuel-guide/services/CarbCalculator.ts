import { round } from 'lodash';

import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport';

export interface CarbSessionInput {
  sport: SportType;
  durationMin: number;
  intensity: IntensityType;
}

interface CarbRange {
  min: number;
  max: number;
}

function getCarbRange(durationMin: number, sport: SportType): CarbRange {
  if (durationMin < 60) {
    return { min: 0, max: 0 };
  }

  if (sport === SportType.Running) {
    if (durationMin < 90) return { min: 20, max: 30 };
    if (durationMin < 150) return { min: 30, max: 60 };
    return { min: 45, max: 75 };
  }

  if (sport === SportType.Cycling) {
    if (durationMin < 90) return { min: 30, max: 45 };
    if (durationMin < 150) return { min: 45, max: 75 };
    return { min: 60, max: 90 };
  }

  throw new Error('Invalid sport');
}

function intensityPosition(intensity: IntensityType): number {
  switch (intensity) {
    case IntensityType.Easy:
      return 0.3;
    case IntensityType.Moderate:
      return 0.6;
    case IntensityType.Hard:
      return 0.9;
  }
}

/**
 * Returns carbs to target in g/h
 */
export function getCarbsPerHour(input: CarbSessionInput): number {
  const { sport, durationMin, intensity } = input;
  const { min, max } = getCarbRange(durationMin, sport);
  const p = intensityPosition(intensity);

  return round(min + (max - min) * p);
}
