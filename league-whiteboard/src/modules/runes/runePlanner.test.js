import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RunePlanner } from './runePlanner.js';

describe('Rune Planner Logic (TDD)', () => {
  let planner;
  let mockStorage;

  // Mock de localStorage
  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };
    planner = new RunePlanner({ storage: mockStorage });
  });

  describe('Initialization', () => {
    it('should initialize with an empty rune page state', () => {
      const state = planner.exportState();
      expect(state).toEqual({
        primaryPathId: null,
        secondaryPathId: null,
        keystoneId: null,
        primaryRuneIds: [null, null, null], // Slots 1, 2, 3
        secondaryRuneIds: [null, null], // Slots 1, 2 (arbitrary selections from minor slots)
        shardIds: [null, null, null] // Offensive, Flex, Defensive
      });
    });
  });

  describe('Path and Rune Selection', () => {
    it('should set primary and secondary paths correctly', () => {
      planner.setPrimaryPath(8000); // Precision
      expect(planner.state.primaryPathId).toBe(8000);

      planner.setSecondaryPath(8100); // Domination
      expect(planner.state.secondaryPathId).toBe(8100);
    });

    it('should reset selections if paths change', () => {
      planner.setPrimaryPath(8000);
      planner.setKeystone(8005);
      planner.setPrimaryRune(0, 9101);
      
      // Changing primary path should reset primary runes & keystone
      planner.setPrimaryPath(8100);
      expect(planner.state.primaryPathId).toBe(8100);
      expect(planner.state.keystoneId).toBeNull();
      expect(planner.state.primaryRuneIds).toEqual([null, null, null]);
    });

    it('should not allow secondary path to be the same as primary path', () => {
      planner.setPrimaryPath(8000);
      expect(planner.setSecondaryPath(8000)).toBe(false);
      expect(planner.state.secondaryPathId).toBeNull();
    });

    it('should set individual slot runes correctly', () => {
      planner.setPrimaryRune(0, 9101); // Row 1
      planner.setPrimaryRune(2, 8014); // Row 3
      expect(planner.state.primaryRuneIds).toEqual([9101, null, 8014]);

      // Out of bounds slot index should be ignored
      expect(planner.setPrimaryRune(3, 9101)).toBe(false);
    });

    it('should set secondary runes correctly (maximum of 2)', () => {
      planner.setSecondaryRune(0, 8126);
      planner.setSecondaryRune(1, 8136);
      expect(planner.state.secondaryRuneIds).toEqual([8126, 8136]);

      // Setting third rune should fail (limit 2)
      expect(planner.setSecondaryRune(2, 8106)).toBe(false);
    });

    it('should set shards correctly (exactly 3: 0, 1, 2)', () => {
      planner.setShard(0, 5001); // Offensive
      planner.setShard(1, 5002); // Flex
      planner.setShard(2, 5003); // Defensive
      expect(planner.state.shardIds).toEqual([5001, 5002, 5003]);

      expect(planner.setShard(3, 5004)).toBe(false);
    });
  });

  describe('Validation', () => {
    it('should validate a complete and correct rune page as valid', () => {
      planner.setPrimaryPath(8000);
      planner.setSecondaryPath(8100);
      planner.setKeystone(8005);
      planner.setPrimaryRune(0, 9101);
      planner.setPrimaryRune(1, 9104);
      planner.setPrimaryRune(2, 8014);
      planner.setSecondaryRune(0, 8126);
      planner.setSecondaryRune(1, 8136);
      planner.setShard(0, 5001);
      planner.setShard(1, 5002);
      planner.setShard(2, 5003);

      expect(planner.isValid()).toBe(true);
    });

    it('should validate an incomplete rune page as invalid', () => {
      planner.setPrimaryPath(8000);
      expect(planner.isValid()).toBe(false); // missing rest
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should save state to storage', () => {
      planner.setPrimaryPath(8000);
      planner.save('my-page');

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'lw-runes-my-page',
        JSON.stringify(planner.exportState())
      );
    });

    it('should load state from storage', () => {
      const savedState = {
        primaryPathId: 8000,
        secondaryPathId: 8100,
        keystoneId: 8005,
        primaryRuneIds: [9101, null, null],
        secondaryRuneIds: [null, null],
        shardIds: [null, null, null]
      };
      
      mockStorage.getItem.mockReturnValue(JSON.stringify(savedState));
      
      const success = planner.load('my-page');
      expect(success).toBe(true);
      expect(planner.state.primaryPathId).toBe(8000);
      expect(planner.state.secondaryPathId).toBe(8100);
      expect(planner.state.keystoneId).toBe(8005);
    });

    it('should return false if load page does not exist in storage', () => {
      mockStorage.getItem.mockReturnValue(null);
      expect(planner.load('non-existent')).toBe(false);
    });
  });
});
