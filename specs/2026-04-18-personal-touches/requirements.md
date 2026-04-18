# Requirements - Personal Touches

## Context
- Why this feature exists: To make the pet feel alive and fun beyond just numbers, adding whimsy and immediate visual feedback.
- Link to roadmap phase and mission alignment: [Roadmap Phase 4](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/roadmap.md#L86) and [Mission Pillar 4](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/mission.md#L24).

## Scope
- **In scope**:
  - CSS-based blob creature representation (eyes and mouth).
  - Text bubbles with animations for actions:
    - `Feed`: "Yum!"
    - `Play`: "Wheee!"
    - `Rest`: "Zzz..."
  - Visual changes to eyes and mouth based on actions.
  - Integration with existing action buttons (Feed, Play, Rest).
- **Out of scope**:
  - Inventories or item management.
  - Currencies or virtual economy.
  - Non-visual state tracking (these are purely visual reactions).

## Decisions
- **Decision: CSS Blob Creature**
  - Rationale: Minimalist, lightweight, and easy to animate within the DOM as per `tech-stack.md`.
  - Tradeoff: Less detail than an SVG or image, but higher flexibility for CSS transitions/animations.
- **Decision: Purely Visual Reactions**
  - Rationale: Keep logic simple and focused on "Personal Touches" without affecting gameplay balance.
  - Tradeoff: Reactions don't persist in state; they are transient UI events.

## Constraints
- **Technical constraints**:
  - Must use Angular 21 (as per `tech-stack.md`).
  - No new backend/persistence required.
  - Must remain "lightweight" and functional without these extras.
- **Product constraints**:
  - Keep it "cute/wholesome" and "casual".

## Open Questions
- Should the text bubbles disappear after a set time? (Assumption: Yes, ~2-3 seconds).
- Should there be specific "idle" animations for different states (Normal, Sick, Evolved)?
