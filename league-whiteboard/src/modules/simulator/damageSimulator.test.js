import { describe, it, expect } from 'vitest';
import { 
  calculateDamage, 
  calculateCCDuration, 
  calculateCDR 
} from './damageSimulator.js';

describe('Damage Simulator Logic (TDD)', () => {
  
  describe('calculateDamage', () => {
    it('should calculate physical damage mitigated by armor correctly', () => {
      // 100 raw physical damage against 100 armor should be 50 final damage (50% reduction)
      expect(calculateDamage(100, 'physical', 100)).toBeCloseTo(50, 2);
      
      // 100 raw physical damage against 0 armor should be 100 final damage
      expect(calculateDamage(100, 'physical', 0)).toBe(100);
      
      // 150 raw physical damage against 50 armor should be 100 final damage (33.33% reduction)
      expect(calculateDamage(150, 'physical', 50)).toBeCloseTo(100, 2);
    });

    it('should calculate magic damage mitigated by magic resistance correctly', () => {
      // 100 raw magic damage against 100 MR should be 50 final damage
      expect(calculateDamage(100, 'magic', 100)).toBeCloseTo(50, 2);
      
      // 200 raw magic damage against 300 MR should be 50 final damage (75% reduction)
      expect(calculateDamage(200, 'magic', 300)).toBeCloseTo(50, 2);
    });

    it('should ignore armor and magic resistance for true damage', () => {
      expect(calculateDamage(100, 'true', 100)).toBe(100);
      expect(calculateDamage(100, 'true', 0)).toBe(100);
      expect(calculateDamage(500, 'true', 300)).toBe(500);
    });

    it('should handle negative resistance correctly using standard League math', () => {
      // For negative resistance: multiplier = 2 - (100 / (100 - Resistance))
      // E.g. -25 resistance: multiplier = 2 - (100 / 125) = 2 - 0.8 = 1.2
      // 100 damage against -25 resistance should be 120 damage
      expect(calculateDamage(100, 'physical', -25)).toBeCloseTo(120, 2);
    });
  });

  describe('calculateCCDuration', () => {
    it('should calculate CC duration reduction by tenacity correctly', () => {
      // 2 seconds stun against 0% tenacity -> 2 seconds
      expect(calculateCCDuration(2.0, 0)).toBe(2.0);

      // 2 seconds stun against 30% tenacity -> 1.4 seconds
      expect(calculateCCDuration(2.0, 30)).toBeCloseTo(1.4, 2);

      // 1 second stun against 50% tenacity -> 0.5 seconds
      expect(calculateCCDuration(1.0, 50)).toBeCloseTo(0.5, 2);
    });

    it('should support game-accurate clamping (minimum 0.5s duration) when enabled', () => {
      // 0.8s stun against 50% tenacity standard math = 0.4s. Game-accurate clamp = 0.5s.
      expect(calculateCCDuration(0.8, 50, { clampMinDuration: true })).toBe(0.5);
      
      // Without clamping, it should calculate the raw mathematical reduction (0.4s)
      expect(calculateCCDuration(0.8, 50, { clampMinDuration: false })).toBeCloseTo(0.4, 2);
    });
  });

  describe('calculateCDR', () => {
    it('should convert Ability Haste to Cooldown Reduction percentage correctly', () => {
      // 0 Ability Haste -> 0% CDR
      expect(calculateCDR(0)).toBe(0);

      // 50 Ability Haste -> 33.33% CDR
      expect(calculateCDR(50)).toBeCloseTo(33.33, 2);

      // 100 Ability Haste -> 50% CDR
      expect(calculateCDR(100)).toBe(50);
      
      // 25 Ability Haste -> 20% CDR
      expect(calculateCDR(25)).toBe(20);
    });
  });

});
