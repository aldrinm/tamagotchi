# Plan - Quality Pass

## Task Groups

1. Discovery and design
   - Review current decay/action settings against "casual visit" targets (~1 min).
   - Implement safeguards: prevent all actions when inappropriate (e.g., no 'Play' while `Sick`).
   - Map out testing scenarios for persistence and time-based decay.

2. Implementation
   - Fine-tune `GAME_CONSTANTS` for better pacing.
   - Implement action safeguards in `GameService`.
   - Refactor `PersistenceService` or its usage to ensure robust state recovery.

3. Validation and release prep
   - Implement unit tests for `GameService` using `Vitest` fake timers.
   - Verify persistence works across page reloads (manual test).
   - Ensure all exit criteria for Phase 5 in `roadmap.md` are met.
