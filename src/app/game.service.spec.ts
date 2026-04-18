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
});
