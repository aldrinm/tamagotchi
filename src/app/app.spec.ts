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

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render baseline pet shell', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tamagotchi');
    expect(compiled.querySelector('h2')?.textContent).toContain('Pixel');
    expect(compiled.querySelector('[aria-label="Current pet state"]')?.textContent).toContain(
      'State: Normal',
    );
    expect(compiled.querySelector('[aria-label="Pet vitals"]')?.textContent).toContain('Hunger');
    expect(compiled.querySelector('[aria-label="Pet vitals"]')?.textContent).toContain('100%');
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
