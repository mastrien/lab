import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BuildComparator } from './buildComparator.js';

describe('Build Comparator Logic (TDD)', () => {
  let comparator;
  let mockStorage;

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };
    comparator = new BuildComparator({ storage: mockStorage });
  });

  describe('Initialization', () => {
    it('should initialize with default builds and no champion', () => {
      const state = comparator.state;
      expect(state.championId).toBeNull();
      expect(state.builds.length).toBe(2);
      expect(state.builds[0].name).toBe('Build 1');
      expect(state.builds[0].items).toEqual([null, null, null, null, null, null]);
    });
  });

  describe('Champion Management', () => {
    it('should set champion correctly and save', () => {
      comparator.setChampion('Aatrox');
      expect(comparator.state.championId).toBe('Aatrox');
      expect(mockStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Build Customization', () => {
    it('should add a build correctly', () => {
      const initialCount = comparator.state.builds.length;
      const buildId = comparator.addBuild('AP Build');
      
      expect(comparator.state.builds.length).toBe(initialCount + 1);
      const added = comparator.state.builds.find(b => b.id === buildId);
      expect(added).toBeDefined();
      expect(added.name).toBe('AP Build');
    });

    it('should remove a build correctly', () => {
      const initialCount = comparator.state.builds.length;
      const buildId = comparator.state.builds[0].id;
      
      comparator.removeBuild(buildId);
      expect(comparator.state.builds.length).toBe(initialCount - 1);
      expect(comparator.state.builds.find(b => b.id === buildId)).toBeUndefined();
    });

    it('should rename a build correctly', () => {
      const buildId = comparator.state.builds[0].id;
      comparator.updateBuildName(buildId, 'Tank Build');
      expect(comparator.state.builds[0].name).toBe('Tank Build');
    });

    it('should set, update, and remove items from build slots', () => {
      const buildId = comparator.state.builds[0].id;
      
      // Set item
      expect(comparator.setItem(buildId, 2, '3031')).toBe(true);
      expect(comparator.state.builds[0].items[2]).toBe('3031');

      // Remove item
      expect(comparator.removeItem(buildId, 2)).toBe(true);
      expect(comparator.state.builds[0].items[2]).toBeNull();

      // Out of bounds slot
      expect(comparator.setItem(buildId, 6, '3031')).toBe(false);
    });

    it('should set and remove trinkets', () => {
      const buildId = comparator.state.builds[0].id;
      
      comparator.setTrinket(buildId, '3340');
      expect(comparator.state.builds[0].trinket).toBe('3340');

      comparator.setTrinket(buildId, null);
      expect(comparator.state.builds[0].trinket).toBeNull();
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should save and load comparator state', () => {
      comparator.setChampion('Lux');
      const buildId = comparator.state.builds[0].id;
      comparator.setItem(buildId, 0, '3089'); // Rabadon

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'lw-comparator',
        JSON.stringify(comparator.state)
      );

      const savedData = {
        championId: 'Lux',
        builds: [
          { id: 'build-1', name: 'AP Build', items: ['3089', null, null, null, null, null], trinket: null }
        ]
      };
      mockStorage.getItem.mockReturnValue(JSON.stringify(savedData));

      const loadSuccess = comparator.load();
      expect(loadSuccess).toBe(true);
      expect(comparator.state.championId).toBe('Lux');
      expect(comparator.state.builds[0].name).toBe('AP Build');
      expect(comparator.state.builds[0].items[0]).toBe('3089');
    });
  });
});
