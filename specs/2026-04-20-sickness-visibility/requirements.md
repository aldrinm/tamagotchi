# Requirements - Sickness Visibility & Health Status

## Context
- Why this feature exists: To make the `Sick` state more impactful and visually distinct, providing clearer feedback to the player when the pet needs urgent care.
- Link to roadmap phase: Phase 7: Sickness Visibility & Health Status
- Mission alignment: Wholesome digital companion with immediate state feedback and "whimsy" (via shivering and status icons).

## Scope
### In scope
- **Pet Visuals in `Sick` state**:
  - Greenish/pale color shift for the blob.
  - Shivering micro-animation (constant while in `Sick` state).
  - Floating status icons (🌡️, 💫) that appear and disappear randomly.
  - **Sick mouth UI**: A downturned/unhappy mouth shape that triggers automatically when sick.
- **Health Status Indicator**:
  - A prominent status badge ("Healthy" vs "Ill").
  - Pulse animation on the badge when `Sick`.
- **Transitions**:
  - Smooth transitions between `Normal` and `Sick` visuals.

### Out of scope
- Specific medicines or items (no inventories).
- Changes to the underlying state logic (already implemented).
- Sound effects.

## Decisions
- Decision: Use CSS variables for the pet's core colors to easily toggle "sickly" tones.
  - Rationale: Makes the color shift maintainable and consistent with existing CSS patterns.
- Decision: Use a dedicated Angular component or template section for the Health Status badge.
  - Rationale: Keeps the UI code modular.

## Constraints
- Technical constraints: Must use CSS animations and Angular 21 (as per tech-stack).
- Product constraints: Must remain "cute/wholesome" even when sick (no overly distressing visuals).

## Open Questions
- None.
