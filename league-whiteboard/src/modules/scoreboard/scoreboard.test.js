import { describe, it, expect, beforeEach } from 'vitest';
import { Scoreboard } from './scoreboard.js';

describe('Scoreboard Logic (TDD)', () => {
  let scoreboard;
  
  // Mock do banco de dados de itens para os testes
  const mockItemDb = {
    '1001': { name: 'Boots', gold: { total: 300, purchasable: true } },
    '3006': { name: "Berserker's Greaves", gold: { total: 1100, purchasable: true } },
    '3031': { name: 'Infinity Edge', gold: { total: 3400, purchasable: true } },
    '3340': { name: 'Warding Totem', gold: { total: 0, purchasable: true } }
  };

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe('Initialization', () => {
    it('should initialize with 5 blue team slots and 5 red team slots', () => {
      const state = scoreboard.exportState();
      
      expect(state.blue).toBeDefined();
      expect(state.red).toBeDefined();
      
      const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
      roles.forEach(role => {
        expect(state.blue[role]).toEqual({ champion: null, items: [], trinket: null });
        expect(state.red[role]).toEqual({ champion: null, items: [], trinket: null });
      });
    });
  });

  describe('Champion Management', () => {
    it('should set and clear champions on roles correctly', () => {
      scoreboard.setChampion('blue', 'TOP', 'Aatrox');
      expect(scoreboard.getSlot('blue', 'TOP').champion).toBe('Aatrox');
      
      scoreboard.setChampion('blue', 'TOP', null);
      expect(scoreboard.getSlot('blue', 'TOP').champion).toBeNull();
    });

    it('should throw an error for invalid team or role', () => {
      expect(() => scoreboard.setChampion('green', 'TOP', 'Aatrox')).toThrow();
      expect(() => scoreboard.setChampion('blue', 'JACARE', 'Aatrox')).toThrow();
    });
  });

  describe('Item Management', () => {
    it('should add items to a role up to a limit of 6 items', () => {
      scoreboard.addItem('blue', 'MID', '1001');
      scoreboard.addItem('blue', 'MID', '3031');
      
      const slot = scoreboard.getSlot('blue', 'MID');
      expect(slot.items).toEqual(['1001', '3031']);
      
      // Fill it up to 6 items
      scoreboard.addItem('blue', 'MID', '3006');
      scoreboard.addItem('blue', 'MID', '3006');
      scoreboard.addItem('blue', 'MID', '3006');
      scoreboard.addItem('blue', 'MID', '3006');
      
      expect(scoreboard.getSlot('blue', 'MID').items.length).toBe(6);
      
      // Trying to add a 7th item should fail (limit 6)
      expect(scoreboard.addItem('blue', 'MID', '3031')).toBe(false);
      expect(scoreboard.getSlot('blue', 'MID').items.length).toBe(6);
    });

    it('should remove items correctly', () => {
      scoreboard.addItem('blue', 'ADC', '1001');
      scoreboard.addItem('blue', 'ADC', '3031');
      
      // Remove the item at index 0 (Boots '1001')
      scoreboard.removeItem('blue', 'ADC', 0);
      expect(scoreboard.getSlot('blue', 'ADC').items).toEqual(['3031']);
      
      // Removing from an invalid index should return false
      expect(scoreboard.removeItem('blue', 'ADC', 5)).toBe(false);
    });

    it('should set and clear trinket separately from standard items', () => {
      scoreboard.setTrinket('red', 'SUPPORT', '3340');
      expect(scoreboard.getSlot('red', 'SUPPORT').trinket).toBe('3340');
      
      scoreboard.setTrinket('red', 'SUPPORT', null);
      expect(scoreboard.getSlot('red', 'SUPPORT').trinket).toBeNull();
    });
  });

  describe('Gold Calculations', () => {
    it('should calculate slot gold cost correctly based on item database', () => {
      scoreboard.addItem('blue', 'TOP', '1001'); // 300
      scoreboard.addItem('blue', 'TOP', '3031'); // 3400
      scoreboard.setTrinket('blue', 'TOP', '3340'); // 0
      
      expect(scoreboard.calculateSlotGold('blue', 'TOP', mockItemDb)).toBe(3700);
    });

    it('should return 0 gold for an empty slot or items not in database', () => {
      expect(scoreboard.calculateSlotGold('blue', 'JUNGLE', mockItemDb)).toBe(0);
      
      scoreboard.addItem('blue', 'JUNGLE', 'unknown_id');
      expect(scoreboard.calculateSlotGold('blue', 'JUNGLE', mockItemDb)).toBe(0);
    });

    it('should calculate total team gold correctly', () => {
      scoreboard.addItem('blue', 'TOP', '1001'); // 300
      scoreboard.addItem('blue', 'MID', '3031'); // 3400
      
      expect(scoreboard.calculateTeamGold('blue', mockItemDb)).toBe(3700);
      expect(scoreboard.calculateTeamGold('red', mockItemDb)).toBe(0);
    });
  });

  describe('State Import/Export', () => {
    it('should import a valid exported state correctly', () => {
      scoreboard.setChampion('blue', 'TOP', 'Gnar');
      scoreboard.addItem('blue', 'TOP', '1001');
      scoreboard.setTrinket('blue', 'TOP', '3340');
      
      const exportedState = scoreboard.exportState();
      
      const newScoreboard = new Scoreboard();
      newScoreboard.importState(exportedState);
      
      expect(newScoreboard.getSlot('blue', 'TOP')).toEqual({
        champion: 'Gnar',
        items: ['1001'],
        trinket: '3340'
      });
    });

    it('should throw an error when importing invalid state structure', () => {
      expect(() => scoreboard.importState(null)).toThrow();
      expect(() => scoreboard.importState({})).toThrow();
      expect(() => scoreboard.importState({ blue: {} })).toThrow();
    });
  });
});
