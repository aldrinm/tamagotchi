# Validation - Sickness Visibility & Health Status

## Success Criteria
- The pet blob turns greenish/pale when `isSick` is true, regardless of evolution status.
- The pet blob shivers when `isSick` is true.
- Floating icons (🌡️, 💫) are visible only when `isSick` is true.
- The pet shows a downturned mouth shape when `isSick`.
- A "Health Status" badge shows "Healthy" (green) when healthy and "Ill" (red) when `isSick`.
- The "Ill" badge pulses rhythmically.
- The "Play" action becomes "Cuddle" when sick, allowing for recovery.
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
1. **Happy Path (Recovery)**: Force the pet into `isSick` state (e.g., set Hunger to 20). Verify the "Play" button becomes "Cuddle". Cuddle/Feed the pet until all vitals are > 40. Wait for recovery sustain window (15s). Verify all visuals return to healthy state.
2. **Persistence**: Set pet to `isSick`. Reload page. Verify sick visuals are still present.
3. **Coexistence**: Evolve the pet, then lower vitals to trigger sickness. Verify the pet shows both evolved hair/glow AND sick color/shiver.
