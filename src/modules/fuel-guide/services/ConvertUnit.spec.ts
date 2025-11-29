import { mgToG, mlToL } from '@/modules/fuel-guide/services/ConvertUnits.ts';
import { describe, expect, it } from 'vitest';

describe('ConvertUnit', () => {
  describe('mlToL', () => {
    it('should return ml for values when value is less than 1000', () => {
      expect(mlToL(500)).toEqual({ value: 500, unit: 'ml' });
    });

    it('should return rounded ml when value is less than 1000', () => {
      expect(mlToL(698.234)).toEqual({ value: 698, unit: 'ml' });
      expect(mlToL(698.934)).toEqual({ value: 699, unit: 'ml' });
    });

    it('should return L when value is more than 1000', () => {
      expect(mlToL(1000)).toEqual({ value: 1, unit: 'L' });
      expect(mlToL(1500)).toEqual({ value: 1.5, unit: 'L' });
    });

    it('should return rounded L when value is more than 1000', () => {
      expect(mlToL(1234)).toEqual({ value: 1.23, unit: 'L' });
      expect(mlToL(1256)).toEqual({ value: 1.26, unit: 'L' });
    });
  });

  describe('mgToG', () => {
    it('should return mg for values when value is less than 1000', () => {
      expect(mgToG(500)).toEqual({ value: 500, unit: 'mg' });
    });

    it('should return rounded mg when value is less than 1000', () => {
      expect(mgToG(698.234)).toEqual({ value: 698, unit: 'mg' });
      expect(mgToG(698.934)).toEqual({ value: 699, unit: 'mg' });
    });

    it('should return g when value is more than 1000', () => {
      expect(mgToG(1000)).toEqual({ value: 1, unit: 'g' });
      expect(mgToG(1500)).toEqual({ value: 1.5, unit: 'g' });
    });

    it('should return rounded g when value is more than 1000', () => {
      expect(mgToG(1234)).toEqual({ value: 1.23, unit: 'g' });
      expect(mgToG(1256)).toEqual({ value: 1.26, unit: 'g' });
    });
  });
});
