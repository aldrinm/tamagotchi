# Validation - Visual Evolution (Advanced Aesthetics)

## Success Criteria
- The pet displays a unique, more structured shape when `state === 'Evolved'`.
- The pet has visible hair strands or similar features in the `Evolved` state.
- A "glow" or "aura" effect is visible around the pet in the `Evolved` state.
- No visual changes occur in `Normal` or `Sick` states.
- Implementation remains performant and matches the existing vanilla CSS style.

## Verification Checklist
- [ ] Visual check: `Normal` state has no hair or glow.
- [ ] Visual check: `Sick` state has no hair or glow.
- [ ] Visual check: `Evolved` state has unique shape, hair, and glow.
- [ ] Unit tests pass: `npm test` (verify core state logic remains sound).
- [ ] Responsive check: Visuals look good on small/large screens.

## Test Plan
1. **Happy-path**:
   - Manually trigger `Evolved` state (e.g., via console or by boosting stats).
   - Observe visual changes: shape, hair, and glow should appear.
2. **State Transition**:
   - Move from `Evolved` back to `Normal` (if possible, or via reload) -> verify features disappear.
3. **Regression**:
   - Confirm sickness visual (yellowish tint) is still distinct and works as before.

## Merge Gate
- Ready to merge when all visual criteria are met and baseline tests pass.
