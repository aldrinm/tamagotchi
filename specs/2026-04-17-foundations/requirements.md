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

## Constraints
- Technical constraints from `specs/tech-stack.md`
  - Web app only using Angular 21.
  - No backend; no server persistence.
  - Local persistence (`localStorage`) is allowed but not required in this phase.
  - Testing stack is `Jest` with deterministic handling for time-based logic in later phases.
- Product constraints from defaults
  - No inventories, currencies, quests, or progression systems.
  - Maintain compatibility with the mission's 1-minute casual interaction target.

## Open Questions
- None currently. Phase 0 scope decisions are locked for implementation.
