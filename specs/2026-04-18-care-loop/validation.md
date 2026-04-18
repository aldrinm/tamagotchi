# Validation - Care Loop (Phase 2)

## Success Criteria
- Clicking "Feed", "Play", or "Rest" correctly modifies Hunger, Happiness, and Energy according to the roadmap deltas.
- Vital values are always clamped between 0 and 100.
- The UI reflects meter changes immediately.
- Actions are persisted to `localStorage` correctly.

## Verification Checklist
- [x] Unit tests for Feed action (H+18, Ha+2) pass.
- [x] Unit tests for Play action (Ha+18, E-4, H-2) pass.
- [x] Unit tests for Rest action (E+20, H-2) pass.
- [ ] Manual check: Vitals clamp at 0 and 100.
- [ ] Manual check: UI buttons are responsive and styled correctly.
- [ ] Manual check: Refreshing the page after an action retains the updated values.

## Test Plan
1. **Happy-path**: Click each button once and verify the meters update by the exact delta amount.
2. **Edge case (Max/Min)**: Perform "Feed" when Hunger is at 95 to verify it clamps at 100. Perform "Play" when Energy/Hunger is low to verify it clamps at 0.
3. **Persistence**: Perform an action, refresh the page, and ensure the stats aren't reset.

## Merge Gate
- Ready to merge when all checklist items are complete and the "Care Loop" behavior is deterministic and persistent.
