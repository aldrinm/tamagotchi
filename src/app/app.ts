import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './game.service';
import { TICK_INTERVAL_SECONDS } from './game.constants';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly gameService = inject(GameService);
  private tickInterval?: any;
  private reactionTimeout?: any;

  // Reaction states
  protected readonly reactionText = signal<string>('');
  protected readonly eyeState = signal<'normal' | 'happy' | 'closed'>('normal');
  protected readonly mouthState = signal<'normal' | 'yum' | 'zzz' | 'open'>('normal');

  ngOnInit(): void {
    this.tickInterval = setInterval(() => {
      this.gameService.tick();
    }, TICK_INTERVAL_SECONDS * 1000);
  }

  ngOnDestroy(): void {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
    if (this.reactionTimeout) {
      clearTimeout(this.reactionTimeout);
    }
  }

  // Exposed for template convenience
  protected get pet() { return this.gameService.pet(); }
  protected get stats() { return this.gameService.stats(); }
  protected get state() { return this.gameService.state(); }

  protected feed(): void {
    this.gameService.feed();
    this.triggerReaction('Yum!', 'normal', 'yum');
  }

  protected play(): void {
    this.gameService.play();
    this.triggerReaction('Wheee!', 'happy', 'open');
  }

  protected rest(): void {
    this.gameService.rest();
    this.triggerReaction('Zzz...', 'closed', 'zzz');
  }

  private triggerReaction(text: string, eyes: 'normal' | 'happy' | 'closed', mouth: 'normal' | 'yum' | 'zzz' | 'open'): void {
    if (this.reactionTimeout) {
      clearTimeout(this.reactionTimeout);
    }

    this.reactionText.set(text);
    this.eyeState.set(eyes);
    this.mouthState.set(mouth);

    this.reactionTimeout = setTimeout(() => {
      this.reactionText.set('');
      this.eyeState.set('normal');
      this.mouthState.set('normal');
      this.reactionTimeout = undefined;
    }, 3000);
  }
}
