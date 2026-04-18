# Tech Stack

Chosen direction (based on the discussion):

- Web app only
- Angular 21 (front-end, no backend)
- No server persistence; local persistence is allowed via `localStorage`
- Simple DOM UI (meters + buttons + state indicator)

This document captures what we still need from the implementation and the key decisions that remain open.

## What the Tech Stack Must Support

- **A real-time (or real-time-ish) ticking system** for:
  - `Hunger`, `Happiness`, `Energy` meters (0-100) that decay over time.
- **A simple action loop**:
  - `Feed`, `Play`, `Rest` to replenish meters.
- **A state machine / derived state layer** that maps stats to:
  - `Normal`, `Sick`, `Evolved`
- **UI that provides immediate visual feedback**
  - meters + current state changes without long delays
- **(Optional but recommended) persistence**
  - so closing/reopening doesn’t reset the pet unfairly

## Open Decisions (Gaps)

1. **Angular project setup**
   - Use Angular 21 with the standard Angular CLI/tooling flow.
2. **Tick/timing cadence (tunable)**
   - Pick a tick interval that feels good in ~1 minute visits (e.g., tick every N seconds).
3. **Elapsed-time catch-up**
   - On app load, compute time since last update so meters decay correctly even if the tab was inactive.
   - Conversion rule: `elapsedTicks = floor(elapsedSeconds / TICK_INTERVAL_SECONDS)`.
4. **Persistence schema**
   - Store stats + `lastUpdatedAt` timestamp in `localStorage` (simple JSON is fine).
   - Persist and parse timestamps in ISO 8601 datetime format.
5. **Testing approach**
   - Standardize on `Vitest` as the test runner/framework for unit and component tests.
6. **Build/deploy**
   - How you will run/build the Angular 21 app (dev server, static host, etc.).

## Suggested Baseline (Pick One)

Baseline for this project:

- **Angular 21 + plain DOM UI**
  - Angular components for meters, action buttons, and the state indicator.
- **Client-side state + derived state**
  - Keep stats as source-of-truth; compute `Normal`/`Sick`/`Evolved` from stats + sustained windows.
  - State precedence is deterministic: `Evolved` > `Sick` > `Normal`.
  - Sustain windows are measured with tick timers.
  - `Evolved` is terminal for a run (no de-evolution).
- **Client-side persistence**
  - Use `localStorage` for stats and last-update time.
- **Default gameplay constants (initial baseline)**
  - `TICK_INTERVAL_SECONDS = 5`
  - decay/tick: Hunger `-2`, Happiness `-2`, Energy `-1`
  - action deltas: Feed `(H+18, Ha+2, E+0)`, Play `(Ha+18, E-4, H-2)`, Rest `(E+20, H-2, Ha+0)`
  - state thresholds: `GOOD_RANGE_MIN = 40`, `EVOLVE_THRESHOLD = 90`, sustain windows = `15s`
  - elapsed-time catch-up uses floor when converting elapsed time to ticks

## Automated Testing Frameworks and Guidelines

### Frameworks

- **Chosen stack:** `Vitest`
  - use as the default framework for unit and component tests
  - run in CI with non-watch mode
  - use fake timers for time-based rules (`vi.useFakeTimers()`)
- **Timer control requirement:**
  - use deterministic timer controls for tick/sustain logic
  - prefer fake timers over real-time waits
- **Detailed Strategy:**
  - See [testing-strategy.md](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/testing-strategy.md) for the full two-level validation plan.

### Guidelines

- **Test pyramid emphasis**
  - prioritize unit tests for core game logic and state transitions
  - keep component tests lightweight and focused on wiring
- **Architecture for testability**
  - keep gameplay rules in pure functions/services, separate from DOM concerns
  - isolate persistence in a dedicated adapter/service layer
- **Deterministic behavior**
  - avoid real-time sleeps/timeouts in tests
  - inject or mock time sources where possible
- **Project organization**
  - colocate `*.spec.ts` files with game logic modules and key UI wiring modules
  - keep test naming aligned with behavior-oriented language

