# Requirements - Quality Pass

## Context
- This phase focuses on polishing the core gameplay experience, ensuring the pet feels alive but not punishing, and that the code is robust and well-tested.
- Aligned with Phase 5 of the [roadmap](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/roadmap.md).

## Scope
- In scope:
  - Tuning constants (tick interval, decay rates).
  - Automated unit tests for state machine and decay logic.
  - Safeguards for actions (e.g., preventing 'Play' if energy is 0).
  - Persistence robustness (no "reset cheats").
- Out of scope:
  - New visual features (Phase 6).
  - New game mechanics (inventories, currencies).

## Decisions
- Decision: Use `Vitest` fake timers for all time-based testing.
  - Rationale: Ensures tests are deterministic and fast.
- Decision: Action safeguards should be implemented in `GameService`.
  - Rationale: Centralizes logic and prevents UI from bypassing rules.
- Decision: Restrict actions while `Sick`: Only `Rest` and `Feed` are allowed. `Play` is disabled.
  - Rationale: Simulates reduced energy/mood when unwell.
- Decision: Implement "Reset" as a full game restart mechanism (lifecycle reboot).
  - Rationale: Allows users to start fresh if needed (referenced in Phase 8).

## Constraints
- Must align with `specs/mission.md` (casual 1-minute visits).
- Must follow `specs/tech-stack.md` (Vitest, Angular signals).
