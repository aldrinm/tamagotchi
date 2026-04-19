# Validation - Quality Pass

## Success Criteria
- User-visible behavior (pacing) feels "fun" and responsive.
- No regressions in basic feeding/playing/resting flows.
- Stats persist correctly and decay accurately after downtime.

## Verification Checklist
- [ ] Unit tests for `GameService` cover decay, state transitions, and actions.
- [ ] Manual test: Perform actions, reload page, verify stats are preserved.
- [ ] Manual test: Leave page for 30s, return, verify decay is calculated correctly.
- [ ] Roadmap Phase 5 marked complete.

## Test Plan
1. Happy-path: Verify all 3 stats decay over time and actions restore them within bounds.
2. Failure/edge: Verify stats clamp at 0 and 100 even with extreme decay/actions.
3. Regression: Verify `Evolved` state is terminal and persists after reload.

## Merge Gate
- Ready to merge when all Vitest tests pass and manual persistence verification is confirmed.
