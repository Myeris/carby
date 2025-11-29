import { describe, expect, it } from 'vitest';

import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity.ts';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport.ts';
import {
  type CarbSessionInput,
  getCarbsPerHour,
} from '@/modules/fuel-guide/services/CarbCalculator.ts';

describe('CarbCalculator', () => {
  it('returns zero carbs when the session is shorter than 60 minutes', () => {
    const input: CarbSessionInput = {
      sport: SportType.Running,
      durationMin: 45,
      intensity: IntensityType.Moderate,
    };

    expect(getCarbsPerHour(input)).toBe(0);
  });

  it('uses running ranges and intensity scaling for mid-duration workouts', () => {
    const input: CarbSessionInput = {
      sport: SportType.Running,
      durationMin: 120,
      intensity: IntensityType.Hard,
    };

    // Running 120 min -> range 30-60, intensity hard -> position 0.9
    expect(getCarbsPerHour(input)).toBeCloseTo(57, 5);
  });

  it('uses cycling ranges for long rides', () => {
    const input: CarbSessionInput = {
      sport: SportType.Cycling,
      durationMin: 180,
      intensity: IntensityType.Easy,
    };

    // Cycling 180 min -> range 60-90, intensity easy -> position 0.3
    expect(getCarbsPerHour(input)).toBeCloseTo(69, 5);
  });
});
