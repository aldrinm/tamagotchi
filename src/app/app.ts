import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { TICK_INTERVAL_SECONDS } from './game.constants';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly gameService = inject(GameService);
  private tickInterval?: any;

  ngOnInit(): void {
    this.tickInterval = setInterval(() => {
      this.gameService.tick();
    }, TICK_INTERVAL_SECONDS * 1000);
  }

  ngOnDestroy(): void {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
  }

  // Exposed for template convenience
  protected get pet() { return this.gameService.pet(); }
  protected get stats() { return this.gameService.stats(); }
  protected get state() { return this.gameService.state(); }
}
