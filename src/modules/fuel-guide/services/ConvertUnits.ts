import { round } from 'lodash';

export function mlToL(ml: number): { value: number; unit: 'ml' | 'L' } {
  if (ml < 1000) return { value: round(ml), unit: 'ml' };
  return { value: round(ml / 1000, 2), unit: 'L' };
}

export function mgToG(mg: number): { value: number; unit: 'mg' | 'g' } {
  if (mg < 1000) return { value: round(mg), unit: 'mg' };
  return { value: round(mg / 1000, 2), unit: 'g' };
}
