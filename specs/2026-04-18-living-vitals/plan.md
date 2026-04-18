# Plan - Living Vitals

## Task Groups

1. Discovery and design
   - Confirm tick logic (5s interval, decay rates)
   - Define persistence strategy (localStorage keys, ISO format)
   - Resolve open questions (catch-up logic details)

2. Implementation
   - Implement `TickService` or equivalent for interval management
   - Implement decay logic in `GameStateService` or within `App` component
   - Implement `PersistenceService` for localStorage integration
   - Build elapsed-time catch-up logic on initialization (deterministic floor behavior)

3. Validation and release prep
   - Add unit tests for decay and catch-up (using Vitest fake timers)
   - Verify meters decrease correctly in UI
   - Verify persistence works across reloads
