import { Injectable, signal } from '@angular/core';
import { Pet, PetState, Stats, GameSnapshot } from './game.models';
import { TICK_INTERVAL_SECONDS, TICK_DECAY, ACTION_DELTAS } from './game.constants';
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
      }
    } else {
      this.save();
    }
  }

  tick(): void {
    this.applyDecay(1);
  }

  feed(): void {
    this.applyActionDelta(ACTION_DELTAS.feed);
  }

  play(): void {
    this.applyActionDelta(ACTION_DELTAS.play);
  }

  rest(): void {
    this.applyActionDelta(ACTION_DELTAS.rest);
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
    this.save();
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
    });
  }
}
