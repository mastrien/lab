import { describe, it, expect, beforeEach } from 'vitest';
import { MapNavigator } from './mapNavigator.js';

describe('Map Navigator Logic (TDD)', () => {
  let navigator;

  beforeEach(() => {
    navigator = new MapNavigator({
      minZoom: 0.5,
      maxZoom: 4.0
    });
  });

  describe('Initialization', () => {
    it('should initialize with default zoom 1.0 and pan at 0, 0', () => {
      const state = navigator.getState();
      expect(state).toEqual({
        zoom: 1.0,
        panX: 0,
        panY: 0
      });
    });
  });

  describe('Panning', () => {
    it('should translate coordinates correctly on pan', () => {
      navigator.pan(10, -20);
      expect(navigator.getState()).toEqual({
        zoom: 1.0,
        panX: 10,
        panY: -20
      });

      navigator.pan(-5, 5);
      expect(navigator.getState()).toEqual({
        zoom: 1.0,
        panX: 5,
        panY: -15
      });
    });
  });

  describe('Zooming and Clamping', () => {
    it('should set zoom and respect minimum and maximum bounds', () => {
      navigator.setZoom(2.0);
      expect(navigator.getState().zoom).toBe(2.0);

      // Exceeding maximum should clamp to 4.0
      navigator.setZoom(5.0);
      expect(navigator.getState().zoom).toBe(4.0);

      // Below minimum should clamp to 0.5
      navigator.setZoom(0.2);
      expect(navigator.getState().zoom).toBe(0.5);
    });

    it('should calculate zoom at a focal point correctly', () => {
      // Container width: 800, height: 600
      // Zoom at cursor position (x: 400, y: 300) with scale factor +0.1
      navigator.zoomAt(0.1, 400, 300);
      
      const state = navigator.getState();
      expect(state.zoom).toBeCloseTo(1.1, 2);
      // Panning must adjust so the zoom pivots around the focal point (400, 300)
      // Math: panX = clientX - (clientX - panX) * factor = 400 - (400 - 0) * 1.1 = 400 - 440 = -40
      expect(state.panX).toBeCloseTo(-40, 2);
      expect(state.panY).toBeCloseTo(-30, 2);
    });
  });

  describe('Resetting', () => {
    it('should reset zoom and panning to initial state', () => {
      navigator.pan(100, 200);
      navigator.setZoom(3.0);
      
      navigator.reset();
      expect(navigator.getState()).toEqual({
        zoom: 1.0,
        panX: 0,
        panY: 0
      });
    });
  });
});
