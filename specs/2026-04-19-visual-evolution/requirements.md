# Requirements - Visual Evolution (Advanced Aesthetics)

## Context
- Phase 6 of the [roadmap](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/roadmap.md).
- This feature exists to provide a sense of progression and reward to the player when their pet reaches the `Evolved` state.
- Aligned with the [mission](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/mission.md) to create a delightful and engaging digital pet experience.

## Scope
### In Scope
- **Unique Blob Shape**: Implementation of a more structured or "majestic" shape for the `Evolved` state using `border-radius` or `clip-path`.
- **CSS Hair/Features**: Adding "random" or stylized features like hair strands using CSS pseudo-elements or additional elements.
- **Subtle Glow/Aura**: Implementing a visual aura or glow effect (e.g., `box-shadow`, `filter: drop-shadow`) that triggers only in the `Evolved` state.
- **Smooth Transitions**: Ensuring the transition from `Normal` -> `Evolved` is visually smooth.

### Out of Scope
- New gameplay mechanics (currencies, items).
- Additional evolution tiers beyond the existing "Evolved" state.
- Sound effects or complex particle systems (keeping it lightweight CSS).

## Decisions
- **Decision: Pure CSS for Visuals**
  - **Rationale**: To keep the application lightweight and align with the request for "no specific constraints" beyond the existing stack.
  - **Tradeoff**: Some complex shapes might be harder to achieve than with SVG, but they will be more performant and easier to animate.

## Constraints
- Technical: Must adhere to the Angular 21 structure and vanilla CSS as specified in [tech-stack.md](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/tech-stack.md).
- Product: Focus on making the evolved pet "more pleasing" to the player without adding punishing mechanics.

## Open Questions
- Should the "hair" strands be animated (e.g., swaying)? (Assumed yes for premium feel).
- Should the aura color be fixed or depend on specific vitals? (Default: match the evolved blue theme).
