import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {
  ACTION_DELTAS,
  EVOLVE_SUSTAIN_SECONDS,
  EVOLVE_THRESHOLD,
  GOOD_RANGE_MIN,
  RECOVERY_SUSTAIN_SECONDS,
  TICK_DECAY,
  TICK_INTERVAL_SECONDS,
} from './game.constants';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render baseline pet shell', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tamagotchi');
    expect(compiled.querySelector('h2')?.textContent).toContain('Pixel');
    expect(compiled.querySelector('[aria-label="Current pet state"]')?.textContent).toContain(
      'State: Normal',
    );
    expect(compiled.querySelector('.health-badge')?.textContent).toContain('Healthy');
    expect(compiled.querySelector('[aria-label="Pet vitals"]')?.textContent).toContain('Hunger');
    expect(compiled.querySelector('[aria-label="Pet vitals"]')?.textContent).toContain('100%');
  });

  describe('Personal Touches (Reactions)', () => {
    it('should show "Yum!" when feeding', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      
      // Use protected access via casting to any for testing signals
      (app as any).feed();
      expect((app as any).reactionText()).toBe('Yum!');
      expect((app as any).eyeState()).toBe('normal');
      expect((app as any).mouthState()).toBe('yum');

      vi.advanceTimersByTime(3000);
      expect((app as any).reactionText()).toBe('');
      expect((app as any).eyeState()).toBe('normal');
      expect((app as any).mouthState()).toBe('normal');
    });

    it('should show "Wheee!" when playing', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      (app as any).play();
      expect((app as any).reactionText()).toBe('Wheee!');
      expect((app as any).eyeState()).toBe('happy');
      expect((app as any).mouthState()).toBe('open');

      vi.advanceTimersByTime(3000);
      expect((app as any).reactionText()).toBe('');
    });

    it('should show "Zzz..." when resting', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      (app as any).rest();
      expect((app as any).reactionText()).toBe('Zzz...');
      expect((app as any).eyeState()).toBe('closed');
      expect((app as any).mouthState()).toBe('zzz');

      vi.advanceTimersByTime(3000);
      expect((app as any).reactionText()).toBe('');
    });

    it('should override previous reaction if action is called again', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;

      (app as any).feed();
      expect((app as any).reactionText()).toBe('Yum!');
      
      vi.advanceTimersByTime(1000); // Wait partially
      (app as any).play();
      expect((app as any).reactionText()).toBe('Wheee!'); // Overridden

      vi.advanceTimersByTime(3000); // Wait for the new timeout
      expect((app as any).reactionText()).toBe('');
    });
  });
});

describe('Foundations constants', () => {
  it('should expose roadmap default values', () => {
    expect(TICK_INTERVAL_SECONDS).toBe(5);
    expect(TICK_DECAY).toEqual({
      hunger: -2,
      happiness: -2,
      energy: -1,
    });
    expect(ACTION_DELTAS.feed).toEqual({
      hunger: 18,
      happiness: 2,
      energy: 0,
    });
    expect(ACTION_DELTAS.play).toEqual({
      hunger: -2,
      happiness: 18,
      energy: -4,
    });
    expect(ACTION_DELTAS.rest).toEqual({
      hunger: -2,
      happiness: 0,
      energy: 20,
    });
    expect(EVOLVE_THRESHOLD).toBe(90);
    expect(EVOLVE_SUSTAIN_SECONDS).toBe(15);
    expect(GOOD_RANGE_MIN).toBe(40);
    expect(RECOVERY_SUSTAIN_SECONDS).toBe(15);
  });
});
