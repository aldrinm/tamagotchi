# Requirements - Foundations

## Context
- This feature establishes the implementation baseline before gameplay behavior begins.
- It maps directly to `Phase 0: Foundations` in `specs/roadmap.md` and supports mission pillars by preparing the app shell, core entities, and tunable constants.

## Scope
- In scope
  - Angular 21 project scaffold with standard Angular tooling.
  - Minimal UI shell with a visible pet area and placeholder values.
  - Core domain structures for `Pet`, `Stats`, and `State` (`Normal`, `Sick`, `Evolved`).
  - Definition of baseline gameplay constants from roadmap defaults.
- Out of scope
  - Real ticking decay behavior and elapsed-time catch-up (Phase 1).
  - Feed/Play/Rest action mechanics (Phase 2).
  - Dynamic state transition logic beyond type definitions (Phase 3).
  - Easter eggs/quirky reactions and pacing polish (Phases 4-5).

## Decisions
- Decision: Use Angular 21 for the client-only implementation baseline.
  - Rationale: Matches `specs/tech-stack.md` chosen stack and roadmap recommendation.
  - Tradeoff: Front-end framework setup overhead is accepted now to reduce future rework.
- Decision: Keep persistence and timing logic out of Phase 0 implementation.
  - Rationale: Preserves phase boundaries and keeps initial delivery small and testable.
  - Tradeoff: Placeholder UI will not yet feel "alive" until Phase 1 is completed.
- Decision: Centralize gameplay defaults as constants during foundation setup.
  - Rationale: Provides a single source of truth for upcoming phase logic.
  - Tradeoff: Some constants may be revised in Phase 5 tuning.
- Decision: Defer pet naming input to the next implementation phase.
  - Rationale: Keeps Foundations focused on shell setup and domain baseline only.
  - Tradeoff: Early UI will not yet expose a user-facing naming interaction.
- Decision: Show only a baseline state indicator in Phase 0 UI.
  - Rationale: Satisfies placeholder feedback without prematurely designing full state visuals.
  - Tradeoff: `Sick` and `Evolved` visual differentiation is deferred to later state-focused work.
- Decision: Lock deterministic state precedence for future gameplay phases.
  - Rule: `Evolved` > `Sick` > `Normal`.
  - Rationale: Removes ambiguity when multiple state conditions are true at once.
  - Tradeoff: Future balancing must respect this precedence contract.
- Decision: Standardize sustain windows as tick-timer based logic.
  - Rule: Sustain windows always advance on ticks, not wall-clock timers.
  - Rationale: Keeps timing behavior deterministic and aligned with tick cadence.
  - Tradeoff: Sustained windows are quantized to tick resolution.
- Decision: Standardize elapsed-time catch-up conversion with floor semantics.
  - Rule: `elapsedTicks = floor(elapsedSeconds / TICK_INTERVAL_SECONDS)`.
  - Rationale: Prevents fractional-tick ambiguity and keeps catch-up deterministic.
  - Tradeoff: Partial intervals do not apply decay until a full tick interval has elapsed.
- Decision: Make `Evolved` a terminal lifecycle state.
  - Rule: Once evolved, the pet cannot de-evolve.
  - Rationale: Establishes a clear lifecycle contract for progression.
  - Tradeoff: Reversibility mechanics are intentionally excluded.
- Decision: Standardize persisted datetime serialization format.
  - Rule: Persist and parse datetime values using ISO 8601 format.
  - Rationale: Ensures consistent, portable timestamp handling.
  - Tradeoff: Parsing logic must reject or normalize non-ISO timestamp inputs.

## Constraints
- Technical constraints from `specs/tech-stack.md`
  - Web app only using Angular 21.
  - No backend; no server persistence.
  - Local persistence (`localStorage`) is allowed but not required in this phase.
  - Testing stack is `Vitest` with deterministic handling for time-based logic in later phases.
  - Cross-phase timing contract uses tick timers for sustain windows and floor conversion for elapsed-time catch-up.
  - Cross-phase persistence contract uses ISO 8601 datetime format for stored/read timestamps.
- Product constraints from defaults
  - No inventories, currencies, quests, or progression systems.
  - Maintain compatibility with the mission's 1-minute casual interaction target.
  - Lifecycle contract: `Evolved` is terminal once reached.

## Open Questions
- None currently. Phase 0 scope decisions are locked for implementation.
