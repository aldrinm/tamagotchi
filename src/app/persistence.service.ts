import { Injectable } from '@angular/core';
import { GameSnapshot } from './game.models';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private readonly STORAGE_KEY = 'tamagotchi_state';

  saveState(snapshot: GameSnapshot): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(snapshot));
  }

  loadState(): GameSnapshot | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as GameSnapshot;
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
      return null;
    }
  }

  clearState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
