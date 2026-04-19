import { Injectable, signal } from '@angular/core';
import { Pet, PetState, Stats, GameSnapshot } from './game.models';
import { TICK_INTERVAL_SECONDS, TICK_DECAY, ACTION_DELTAS, EVOLVE_THRESHOLD, EVOLVE_SUSTAIN_SECONDS, GOOD_RANGE_MIN, RECOVERY_SUSTAIN_SECONDS } from './game.constants';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly stats = signal<Stats>({
    hunger: 100,
    happiness: 100,
    energy: 100,
  });

  readonly pet = signal<Pet>({
    name: 'Pixel',
    evolutionName: 'Nova Pixel',
    recoveryFormName: 'Pixel',
  });

  readonly state = signal<PetState>('Normal');
  readonly lastUpdatedAt = signal<string>(new Date().toISOString());

  private evolveSustainTicks = 0;
  private recoverySustainTicks = 0;

  constructor(private persistenceService: PersistenceService) {
    this.initialize();
  }

  private initialize(): void {
    const saved = this.persistenceService.loadState();
    if (saved) {
      this.pet.set(saved.pet);
      this.state.set(saved.state);
      this.stats.set(saved.stats);
      this.lastUpdatedAt.set(saved.lastUpdatedAt);

      // Catch-up logic
      const now = new Date();
      const lastUpdate = new Date(saved.lastUpdatedAt);
      const elapsedSeconds = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);
      const elapsedTicks = Math.floor(elapsedSeconds / TICK_INTERVAL_SECONDS);

      if (elapsedTicks > 0) {
        this.applyDecay(elapsedTicks);
      } else {
        this.evolveSustainTicks = saved.evolveSustainTicks ?? 0;
        this.recoverySustainTicks = saved.recoverySustainTicks ?? 0;
      }
    } else {
      this.save();
    }
  }

  tick(): void {
    this.applyDecay(1);
  }

  feed(): void {
    if (this.canFeed()) {
      this.applyActionDelta(ACTION_DELTAS.feed);
    }
  }

  play(): void {
    if (this.canPlay()) {
      this.applyActionDelta(ACTION_DELTAS.play);
    }
  }

  rest(): void {
    if (this.canRest()) {
      this.applyActionDelta(ACTION_DELTAS.rest);
    }
  }

  canFeed(): boolean {
    return this.stats().hunger < 100;
  }

  canPlay(): boolean {
    const isHealthy = this.state() !== 'Sick';
    const hasEnergy = this.stats().energy >= 10;
    return isHealthy && hasEnergy;
  }

  canRest(): boolean {
    return this.stats().energy < 100;
  }

  private applyActionDelta(delta: { hunger: number; happiness: number; energy: number }): void {
    const current = this.stats();
    const next: Stats = {
      hunger: this.clamp(current.hunger + delta.hunger),
      happiness: this.clamp(current.happiness + delta.happiness),
      energy: this.clamp(current.energy + delta.energy),
    };

    this.stats.set(next);
    this.lastUpdatedAt.set(new Date().toISOString());
    this.updateState(0);
    this.save();
  }

  applyDecay(ticks: number): void {
    const current = this.stats();
    const next: Stats = {
      hunger: this.clamp(current.hunger + TICK_DECAY.hunger * ticks),
      happiness: this.clamp(current.happiness + TICK_DECAY.happiness * ticks),
      energy: this.clamp(current.energy + TICK_DECAY.energy * ticks),
    };

    this.stats.set(next);
    this.lastUpdatedAt.set(new Date().toISOString());
    this.updateState(ticks);
    this.save();
  }

  private updateState(ticks: number): void {
    const current = this.stats();
    const currentState = this.state();

    if (currentState === 'Evolved') {
      return;
    }

    // Rule: Sick activates when ANY vital falls below GOOD_RANGE_MIN
    const isBelowGoodRange =
      current.hunger < GOOD_RANGE_MIN ||
      current.happiness < GOOD_RANGE_MIN ||
      current.energy < GOOD_RANGE_MIN;

    if (isBelowGoodRange) {
      if (currentState !== 'Sick') {
        this.state.set('Sick');
      }
      this.evolveSustainTicks = 0;
      this.recoverySustainTicks = 0;
      return;
    }

    // Rule: Evolved activates when ALL vitals >= EVOLVE_THRESHOLD for EVOLVE_SUSTAIN_SECONDS
    const isAboveEvolveThreshold =
      current.hunger >= EVOLVE_THRESHOLD &&
      current.happiness >= EVOLVE_THRESHOLD &&
      current.energy >= EVOLVE_THRESHOLD;

    if (isAboveEvolveThreshold) {
      this.evolveSustainTicks += ticks;
      if (this.evolveSustainTicks * TICK_INTERVAL_SECONDS >= EVOLVE_SUSTAIN_SECONDS) {
        this.state.set('Evolved');
      }
    } else {
      this.evolveSustainTicks = 0;
    }

    // Rule: Normal recovery activates only after ALL vitals back in good range for RECOVERY_SUSTAIN_SECONDS
    if (currentState === 'Sick' && !isBelowGoodRange) {
      this.recoverySustainTicks += ticks;
      if (this.recoverySustainTicks * TICK_INTERVAL_SECONDS >= RECOVERY_SUSTAIN_SECONDS) {
        this.state.set('Normal');
      }
    } else {
      this.recoverySustainTicks = 0;
    }
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  private save(): void {
    this.persistenceService.saveState({
      pet: this.pet(),
      stats: this.stats(),
      state: this.state(),
      lastUpdatedAt: this.lastUpdatedAt(),
      evolveSustainTicks: this.evolveSustainTicks,
      recoverySustainTicks: this.recoverySustainTicks,
    });
  }
}
