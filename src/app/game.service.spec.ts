import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { PersistenceService } from './persistence.service';
import { TICK_DECAY } from './game.constants';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('GameService', () => {
  let service: GameService;
  let persistenceService: PersistenceService;

  beforeEach(() => {
    // Clear localStorage mock if necessary or just rely on TestBed reset
    const persistenceMock = {
      saveState: vi.fn(),
      loadState: vi.fn().mockReturnValue(null),
    };

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: PersistenceService, useValue: persistenceMock }
      ]
    });

    service = TestBed.inject(GameService);
    persistenceService = TestBed.inject(PersistenceService);
  });

  it('should initialize with default stats if no saved state exists', () => {
    expect(service.stats()).toEqual({
      hunger: 100,
      happiness: 100,
      energy: 100,
    });
  });

  it('should apply decay correctly', () => {
    service.tick();
    expect(service.stats().hunger).toBe(100 + TICK_DECAY.hunger);
    expect(service.stats().happiness).toBe(100 + TICK_DECAY.happiness);
    expect(service.stats().energy).toBe(100 + TICK_DECAY.energy);
  });

  it('should clamp stats at 0', () => {
    service.applyDecay(100); // Massive decay
    expect(service.stats().hunger).toBe(0);
    expect(service.stats().happiness).toBe(0);
    expect(service.stats().energy).toBe(0);
  });

  describe('Actions', () => {
    beforeEach(() => {
      // Set predictable stats for testing actions
      service.applyDecay(25); // Set stats to ~50 range
      vi.clearAllMocks();
    });

    it('should apply Feed action correctly', () => {
      const before = service.stats();
      service.feed();
      const delta = { hunger: 18, happiness: 2, energy: 0 };
      
      expect(service.stats().hunger).toBe(Math.min(100, before.hunger + delta.hunger));
      expect(service.stats().happiness).toBe(Math.min(100, before.happiness + delta.happiness));
      expect(service.stats().energy).toBe(Math.min(100, before.energy + delta.energy));
      expect(persistenceService.saveState).toHaveBeenCalled();
    });

    it('should apply Play action correctly', () => {
      const before = service.stats();
      service.play();
      const delta = { hunger: -2, happiness: 18, energy: -4 };
      
      expect(service.stats().hunger).toBe(Math.max(0, before.hunger + delta.hunger));
      expect(service.stats().happiness).toBe(Math.min(100, before.happiness + delta.happiness));
      expect(service.stats().energy).toBe(Math.max(0, before.energy + delta.energy));
      expect(persistenceService.saveState).toHaveBeenCalled();
    });

    it('should apply Rest action correctly', () => {
      const before = service.stats();
      service.rest();
      const delta = { hunger: -2, happiness: 0, energy: 20 };
      
      expect(service.stats().hunger).toBe(Math.max(0, before.hunger + delta.hunger));
      expect(service.stats().happiness).toBe(before.happiness);
      expect(service.stats().energy).toBe(Math.min(100, before.energy + delta.energy));
      expect(persistenceService.saveState).toHaveBeenCalled();
    });

    it('should clamp stats at 100 after actions', () => {
      // Set stats to 95
      service.applyDecay(-50); // This isn't how it works, let's just use feed repeatedly
      for (let i = 0; i < 10; i++) service.feed();
      
      expect(service.stats().hunger).toBe(100);
      expect(service.stats().happiness).toBe(100);
      expect(service.stats().energy).toBe(100);
    });
  });

  describe('Initialization', () => {
    it('should catch up on missed ticks during initialization', () => {
      const now = Date.now();
      const lastUpdate = new Date(now - 12000).toISOString(); // 12 seconds ago = 2 ticks

      const persistenceMock = {
        saveState: vi.fn(),
        loadState: vi.fn().mockReturnValue({
          pet: { name: 'Pixel', evolutionName: '', recoveryFormName: '' },
          stats: { hunger: 100, happiness: 100, energy: 100 },
          state: 'Normal',
          lastUpdatedAt: lastUpdate
        }),
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          GameService,
          { provide: PersistenceService, useValue: persistenceMock }
        ]
      });

      const initService = TestBed.inject(GameService);
      
      // 100 - (2 ticks * 2 decay) = 96
      expect(initService.stats().hunger).toBe(96);
      expect(initService.stats().happiness).toBe(96);
      expect(initService.stats().energy).toBe(98);
    });
  });

  describe('State Transitions', () => {
    it('should transition to Sick if any vital falls below 40', () => {
      // stats: 100, 100, 100
      // GOOD_RANGE_MIN = 40
      // TICK_DECAY = -2, -2, -1
      // To get hunger < 40, we need (100 - 40) / 2 = 30 ticks + 1 = 31 ticks
      service.applyDecay(31);
      expect(service.state()).toBe('Sick');
    });

    it('should recover to Normal after sustained health (15s = 3 ticks)', () => {
      service.applyDecay(31); // Enter Sick
      expect(service.state()).toBe('Sick');

      // Feed to get back in good range
      service.feed();
      service.feed(); // Hunger should be > 40 now
      expect(service.stats().hunger).toBeGreaterThanOrEqual(40);
      expect(service.state()).toBe('Sick'); // Still sick, needs sustain

      // Apply 3 ticks of decay (but keep stats > 40)
      // Feed more to be safe
      for (let i = 0; i < 5; i++) service.feed();
      
      service.applyDecay(1);
      expect(service.state()).toBe('Sick');
      service.applyDecay(1);
      expect(service.state()).toBe('Sick');
      service.applyDecay(1);
      expect(service.state()).toBe('Normal');
    });

    it('should transition to Evolved after sustained high vitals (15s = 3 ticks)', () => {
      // stats start at 100
      // EVOLVE_THRESHOLD = 90
      // 1 tick decay (98, 98, 99)
      service.applyDecay(1);
      expect(service.state()).toBe('Normal');
      
      service.applyDecay(1);
      expect(service.state()).toBe('Normal');
      
      service.applyDecay(1);
      expect(service.state()).toBe('Evolved');
    });

    it('should not de-evolve once Evolved', () => {
      service.applyDecay(3); // Evolve
      expect(service.state()).toBe('Evolved');

      service.applyDecay(100); // Massive decay
      expect(service.stats().hunger).toBe(0);
      expect(service.state()).toBe('Evolved'); // Still evolved
    });

    it('should persist sustain counters', () => {
      service.applyDecay(2); // 2 ticks of high vitals
      expect(service.state()).toBe('Normal');

      // Check if saveState was called with counters
      expect(persistenceService.saveState).toHaveBeenCalledWith(expect.objectContaining({
        evolveSustainTicks: 2,
        state: 'Normal'
      }));
    });
  });
});
