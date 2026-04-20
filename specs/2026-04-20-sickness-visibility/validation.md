# Validation - Sickness Visibility & Health Status

## Success Criteria
- The pet blob turns greenish/pale when the state is `Sick`.
- The pet blob shivers when the state is `Sick`.
- Floating icons (🌡️, 💫) are visible only in the `Sick` state.
- The pet shows a downturned mouth shape when `Sick`.
- A "Health Status" badge shows "Healthy" (green) in `Normal`/`Evolved` and "Ill" (red) in `Sick`.
- The "Ill" badge pulses rhythmically.
- Visuals revert to healthy states when the pet recovers.

## Verification Checklist
- [ ] Visual inspection of color shift.
- [ ] Visual inspection of shivering animation.
- [ ] Visual inspection of floating icons.
- [ ] Visual inspection of downturned sick mouth.
- [ ] Health status badge correctly reflects state.
- [ ] Pulse animation on "Ill" badge confirmed.
- [ ] Automated tests confirm CSS classes are applied correctly based on state.

## Test Plan
1. **Happy Path (Recovery)**: Force the pet into `Sick` state (e.g., set Hunger to 20). Verify all sick visuals. Feed the pet until all vitals are > 40. Wait for recovery sustain window (15s). Verify all visuals return to healthy state.
2. **Persistence**: Set pet to `Sick`. Reload page. Verify sick visuals are still present.
3. **Evolved Priority**: Ensure that even if vitals are low, if the pet is already `Evolved`, it does not show sick visuals (as per precedence rules `Evolved` > `Sick`). *Note: Actually, once evolved, it's terminal, but I should double check if it can still get sick. The mission says "once evolved, the pet cannot de-evolve".*
