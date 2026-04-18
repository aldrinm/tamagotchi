# Roadmap

This roadmap breaks implementation into small, testable phases aligned with `README.md`:
`Living Vitals` -> `Care Loop` -> `Dynamic States` -> `Personal Touches`.

## Phase 0: Foundations (no gameplay yet) - Complete

- Create the project skeleton (whatever tech stack you choose).
- Add a minimal app shell that can render a “pet” area on screen.
- Define the core data structures for:
  - `Pet` (name, 1 evolution, 1 recovery path)
  - `Stats` (Hunger, Happiness, Energy in 0-100)
  - `State` (`Normal`, `Sick`, `Evolved`)
- Define gameplay parameters (concrete defaults):
  - `TICK_INTERVAL_SECONDS = 5`
  - per tick decay: `Hunger -= 2`, `Happiness -= 2`, `Energy -= 1`
  - action deltas:
    - `Feed`: `Hunger +18`, `Happiness +2`, `Energy +0`
    - `Play`: `Happiness +18`, `Energy -4`, `Hunger -2`
    - `Rest`: `Energy +20`, `Hunger -2`, `Happiness +0`
  - `EVOLVE_THRESHOLD = 90`
  - `EVOLVE_SUSTAIN_SECONDS = 15` (how long vitals must stay >= `EVOLVE_THRESHOLD`)
  - `GOOD_RANGE_MIN = 40` (minimum value for a vital to remain in the "good range")
  - `RECOVERY_SUSTAIN_SECONDS = 15` (how long all vitals must stay back in good range before leaving `Sick`)

Recommended implementation notes:
- Use Angular 21 project scaffolding and standard Angular tooling.

Exit criteria:
- Code compiles/runs.
- You can render a pet UI with placeholder values.

## Phase 1: Living Vitals (ticking meters)

- Implement the decay/tick rule for `Hunger`, `Happiness`, and `Energy`.
- Use default cadence:
  - `TICK_INTERVAL_SECONDS = 5`
  - per tick decay: `Hunger -= 2`, `Happiness -= 2`, `Energy -= 1`
- Use elapsed-time catch-up:
  - store `lastUpdatedAt`
  - on app load (and after any downtime), compute how much time passed and apply decay accordingly
  - conversion rule: `elapsedTicks = floor(elapsedSeconds / TICK_INTERVAL_SECONDS)`
  - apply decay using `elapsedTicks` only (deterministic floor behavior)
- Ensure values clamp to `[0, 100]`.
- Persist state locally:
  - store stats + `lastUpdatedAt` in `localStorage`
  - store and read `lastUpdatedAt` as an ISO 8601 datetime string

Exit criteria:
- Stats visibly decrease over time.
- Refreshing does not reset meters unfairly (uses elapsed-time catch-up + `localStorage`).

## Phase 2: Care Loop (Feed / Play / Rest)

- Add actions:
  - `Feed`: `Hunger +18`, `Happiness +2`, `Energy +0`
  - `Play`: `Happiness +18`, `Energy -4`, `Hunger -2`
  - `Rest`: `Energy +20`, `Hunger -2`, `Happiness +0`
- Clamp all vital values to `[0, 100]` after every action.
- Connect actions to the UI so they have an immediate effect.

Exit criteria:
- Clicking/triggering each action updates the correct meters.
- Meter updates are consistent (no negative/overflow values).

## Phase 3: Dynamic States (Normal / Sick / Evolved)

- Implement a deterministic mapping from current stats to pet state:
  - `Normal` / `Sick` / `Evolved`
  - state precedence must be `Evolved` > `Sick` > `Normal`
- Timing rules:
  - `Sick` activates when **any** vital falls below `GOOD_RANGE_MIN = 40`.
  - `Normal` recovery activates only after **all** vitals are back in good range for `RECOVERY_SUSTAIN_SECONDS = 15`.
  - `Evolved` activates when all vitals are >= `EVOLVE_THRESHOLD` for `EVOLVE_SUSTAIN_SECONDS = 15`.
  - sustain windows are always measured using tick timers (not wall-clock timers)
  - once `Evolved`, the pet cannot de-evolve
- Ensure state changes happen immediately after:
  - applying elapsed-time decay, and
  - executing any action
- Add a small UI indicator for the current state (text and/or visuals).

Exit criteria:
- You can reproduce each state by manipulating stats.
- State transitions feel immediate and predictable.

## Phase 4: Personal Touches (quirky reactions)

- Add at least one “Easter egg” reaction per pillar:
  - feeding/play/rest triggers a small text/animation response
- Keep it lightweight:
  - no inventories, no currencies, no quest progression required

Exit criteria:
- There are distinct reactions tied to actions and/or state changes.
- The pet still functions fully without the easter eggs.

## Phase 5: Quality Pass (polish without scope creep)

- Tune tick/action/state thresholds for “fun” pacing.
- Apply the [Testing Strategy](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/testing-strategy.md) (Automated + Manual).
- Verify casual pacing:
  - common 1-minute visits should produce noticeable but not punishing changes
- Add minimal safeguards:
  - prevent actions during invalid state if you decide that matters
- Ensure persistence works as designed (no “reset cheats” when the page reloads).

Exit criteria:
- Game loop feels stable and responsive.
- No new systems that conflict with “no inventories/no currencies”.

