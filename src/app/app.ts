import { Component } from '@angular/core';
import { Pet, PetState, Stats } from './game.models';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'tamagotchi';
  protected readonly pet: Pet = {
    name: 'Pixel',
    evolutionName: 'Nova Pixel',
    recoveryFormName: 'Pixel',
  };
  protected readonly stats: Stats = {
    hunger: 72,
    happiness: 68,
    energy: 80,
  };
  protected readonly state: PetState = 'Normal';
}
