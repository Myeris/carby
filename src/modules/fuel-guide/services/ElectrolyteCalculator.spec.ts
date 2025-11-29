import { describe, expect, it } from 'vitest';

import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import type { ElectrolyteProfile } from '@/modules/fuel-guide/services/ElectrolyteCalculator.ts';
import { getSodiumMgPerHour } from '@/modules/fuel-guide/services/ElectrolyteCalculator.ts';

describe('ElectrolyteCalculator', () => {
  const baseProfile: ElectrolyteProfile = {
    sweatLevel: SweatLevel.Medium,
    saltCrust: false,
    durationMin: 90,
  };

  it('returns zero sodium need for sessions shorter than 60 minutes', () => {
    const shortProfile: ElectrolyteProfile = { ...baseProfile, durationMin: 45 };

    expect(getSodiumMgPerHour(600, shortProfile)).toBe(0);
  });

  it('returns zero when fluid intake is missing', () => {
    expect(getSodiumMgPerHour(undefined as unknown as number, baseProfile)).toBe(0);
  });

  it('scales sodium by sweat profile and fluid volume', () => {
    const saltySweater: ElectrolyteProfile = {
      sweatLevel: SweatLevel.High,
      saltCrust: true,
      durationMin: 120,
    };

    // Baseline 400 + 100 (sweat = high) + 200 (salt crust) = 700 mg/L
    // 750 mL/h -> 0.75 L/h, expect 525 mg/h
    expect(getSodiumMgPerHour(750, saltySweater)).toBeCloseTo(525, 5);
  });

  it('uses the baseline sodium concentration for average sweaters', () => {
    expect(getSodiumMgPerHour(1000, baseProfile)).toBe(400);
  });
});
