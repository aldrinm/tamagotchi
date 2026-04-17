export const TICK_INTERVAL_SECONDS = 5;

export const TICK_DECAY = {
  hunger: -2,
  happiness: -2,
  energy: -1,
} as const;

export const ACTION_DELTAS = {
  feed: {
    hunger: 18,
    happiness: 2,
    energy: 0,
  },
  play: {
    hunger: -2,
    happiness: 18,
    energy: -4,
  },
  rest: {
    hunger: -2,
    happiness: 0,
    energy: 20,
  },
} as const;

export const EVOLVE_THRESHOLD = 90;
export const EVOLVE_SUSTAIN_SECONDS = 15;
export const GOOD_RANGE_MIN = 40;
export const RECOVERY_SUSTAIN_SECONDS = 15;

