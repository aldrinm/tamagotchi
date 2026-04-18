# Requirements - Care Loop (Phase 2)

## Context
- This feature implements the core interaction loop for the Tamagotchi, allowing users to care for their pet.
- It aligns with the "Care Loop" phase in `roadmap.md` and the second core pillar in `mission.md`.

## Scope
- **In scope**
  - Implementation of `Feed` action: `Hunger +18`, `Happiness +2`, `Energy +0`
  - Implementation of `Play` action: `Happiness +18`, `Energy -4`, `Hunger -2`
  - Implementation of `Rest` action: `Energy +20`, `Hunger -2`, `Happiness +0`
  - Clamping vital values to `[0, 100]` after every action.
  - Immediate UI feedback for actions (updating meters).
- **Out of scope**
  - Dynamic states (Sick/Evolved) - these belong to Phase 3.
  - Inventories or item selection.

## Decisions
- **Decision: Vital Clamping**
  - Rationale: Prevent stats from exceeding logical bounds (0-100).
  - Tradeoff: Simple but effective; players can't "over-feed" to gain an advantage.
- **Decision: Direct Delta Application**
  - Rationale: Matches the deterministic rules defined in the roadmap.
  - Tradeoff: Actions are predictable and easy to test.

## Constraints
- **Technical constraints**
  - Must use Angular 21 project structure.
  - State should be persistent in `localStorage` (inherited from Phase 1).
- **Product constraints**
  - Keep interactions fast (designed for ~1 minute sessions).

## Open Questions
- None at this time.
