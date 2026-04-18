# Validation - Living Vitals

## Success Criteria
- Vitals decrease by the correct amounts every 5 seconds.
- Values never drop below 0 or exceed 100.
- State persists after page refresh.
- Offline time is accounted for correctly upon return.

## Verification Checklist
- [ ] Unit tests for `TickService` and `GameStateService` decay logic.
- [ ] Unit tests for `PersistenceService` serializing/deserializing ISO strings.
- [ ] Manual verification: Wait 15 seconds, confirm decay happens 3 times.
- [ ] Manual verification: Refresh page, confirm stats match previous state + elapsed decay.

## Test Plan
1. Happy-path: App running, meters decrementing.
2. Failure/edge: App closed for long period, confirm meters catch up correctly (clamping at 0).
3. Regression: Ensure initial state is correctly loaded from fresh `localStorage`.

## Merge Gate
- Ready to merge when all checklist items are complete and no blocking questions remain.
