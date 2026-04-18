# Requirements - Living Vitals

## Context
- This feature implements the autonomous "heartbeat" of the pet, where vitals decay over time.
- Aligns with Phase 1 of the [roadmap](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/roadmap.md).

## Scope
- In scope:
  - Hunger, Happiness, Energy decay every 5 seconds.
  - Vitals clamped to [0, 100].
  - Local persistence of state and `lastUpdatedAt` timestamp.
  - Catch-up logic for offline time.
- Out of scope:
  - User actions (Feed/Play/Rest).
  - State transitions (Normal/Sick/Evolved).
  - UI animations for decay.

## Decisions
- Decision: Use `TICK_INTERVAL_SECONDS = 5`
  - Rationale: Aligned with roadmap for casual pacing.
- Decision: Use `floor` for elapsed ticks
  - Rationale: Deterministic behavior as per roadmap.
  - Tradeoff: Slight loss of precision for sub-5s intervals (e.g., 4.9s becomes 0 ticks).

## Constraints
- Must use Angular 21.
- Persistence only via `localStorage`.

## Open Questions
- None at this time.
