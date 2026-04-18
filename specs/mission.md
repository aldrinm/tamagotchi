# Mission

Build a cute/wholesome digital companion, `tamagotchi`, that feels alive and fun to play with (with a touch of whimsy).

## Player Experience Targets

- Casual sessions: designed for ~1 minute of interaction at a time (fast feedback, minimal busywork).
- Simple DOM UI: meters, buttons, and immediate state feedback.

## Core Pillars

1. **Living Vitals**
   - Hunger, Happiness, and Energy are numeric meters (0-100).
   - These meters automatically "tick" down over time to simulate real-time needs.

2. **The Care Loop**
   - Provide simple actions that replenish stats: `Feed`, `Play`, and `Rest`.
   - Players keep the pet healthy by choosing the right action at the right time.

3. **Dynamic States**
   - The pet has visible states that respond immediately to player caretaking success:
     - `Normal`, `Sick`, `Evolved`

4. **Personal Touches**
   - Add small "Easter eggs" or quirky reactions that make the pet feel unique beyond the numbers.

## Scope (Must-Haves)

- **Pet**
  - Naming (1 user)
  - 1 evolution
  - 1 recovery path
  - No inventories
  - No currencies

- **Stats**
  - `Hunger`, `Happiness`, `Energy` with values in the range 0-100

- **Actions**
  - `Feed`, `Play`, `Rest`

- **States**
  - `Normal`, `Sick`, `Evolved`

## State Definition

To keep gameplay simple but expressive, state is derived from the three vitals and (optionally) short sustained windows.

State precedence (deterministic):
- `Evolved` > `Sick` > `Normal`
- If multiple state conditions are simultaneously true, choose the highest-precedence state.

Default values:
- `GOOD_RANGE_MIN = 40`
- `EVOLVE_THRESHOLD = 90`
- `RECOVERY_SUSTAIN_SECONDS = 15`
- `EVOLVE_SUSTAIN_SECONDS = 15`

## Gameplay Defaults

These defaults are chosen for casual ~1-minute visits and can be tuned later after playtesting.

- `TICK_INTERVAL_SECONDS = 5`
- Per tick decay:
  - `Hunger -= 2`
  - `Happiness -= 2`
  - `Energy -= 1`
- Action deltas:
  - `Feed`: `Hunger +18`, `Happiness +2`, `Energy +0`
  - `Play`: `Happiness +18`, `Energy -4`, `Hunger -2`
  - `Rest`: `Energy +20`, `Hunger -2`, `Happiness +0`
- Clamp rule:
  - all vitals are clamped to `[0, 100]` after every tick and action
- Sustain timer model: sustain windows are always measured with tick timers (not wall-clock timers).

- **Sick**
  - Trigger condition: if **any** vital falls below `GOOD_RANGE_MIN = 40`, the pet becomes `Sick`.
  - Recovery path: once all vitals are back in their good range, the pet returns to `Normal` after a short continuous sustain window.
  - Default sustain window: `RECOVERY_SUSTAIN_SECONDS = 15`.


- **Evolved**
  - Threshold condition: **all three vitals must reach 90+** (set by `EVOLVE_THRESHOLD = 90`).
  - Timing condition: after reaching those levels, the pet becomes `Evolved` only after staying in the qualifying range for a sustained window.
  - Default sustain window: `EVOLVE_SUSTAIN_SECONDS = 15`.
  - Lifecycle rule: `Evolved` is terminal for a run; once evolved, the pet cannot de-evolve.

All thresholds/timing are intentionally tunable to achieve the “reasonable time” feel for casual 1-minute visits.

## Non-Goals (To Avoid Scope Creep)

- Inventories and item management
- Currency/virtual economy
- Complex questing, crafting, or RPG progression trees

