import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat.ts';
import { round } from 'lodash';

export interface ElectrolyteProfile {
  sweatLevel: SweatLevel;
  saltCrust: boolean;
  durationMin: number;
}

function sodiumPerLiterMg(profile: ElectrolyteProfile): number {
  let baseline = 400;

  if (profile.sweatLevel === SweatLevel.High) {
    baseline += 100;
  }

  if (profile.saltCrust) {
    baseline += 200;
  }

  // Clamp between 400 and 900 mg/L
  return Math.min(900, Math.max(400, baseline));
}

/**
 * Returns target sodium intake in mg/h
 */
export function getSodiumMgPerHour(fluidMlPerHour: number, profile: ElectrolyteProfile): number {
  if (profile.durationMin < 60 || fluidMlPerHour == null) {
    return 0;
  }

  const mgPerL = sodiumPerLiterMg(profile);
  const litersPerHour = fluidMlPerHour / 1000;
  return round(mgPerL * litersPerHour);
}
