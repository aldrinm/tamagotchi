# Requirements - Naming & Rebirth

## Context
- **Why this feature exists**: To personalize the player's experience by allowing them to name their pet and to provide a "start over" mechanism for new lifecycles.
- **Link to roadmap phase**: Phase 8: Naming & Rebirth.
- **Mission alignment**: Enhances the "Pillars of Wholesomeness" by giving the pet a persistent identity.

## Scope
- **In scope**:
    - "Welcome" modal for initial naming.
    - Persistent name storage in `localStorage`.
    - Name display in the app header.
    - "Reset Game" button in the footer.
    - Confirmation dialog for game reset.
    - Name validation (length limit).
- **Out of scope**:
    - Renaming an existing pet (naming is permanent for the lifecycle).
    - Complex profanity filters (simple length check only).
    - Multiple save slots.

## Decisions
- **Decision: Naming Flow as a Modal**
    - **Rationale**: Keeps the player focused on the naming task before engaging with gameplay.
    - **Tradeoff**: Interrupts the initial view, but only once per lifecycle.
- **Decision: Name in Header**
    - **Rationale**: Provides constant visibility of the pet's identity without crowding the character area.
- **Decision: Reset in Footer**
    - **Rationale**: Follows standard convention for "dangerous" actions, keeping it away from primary interaction buttons (Feed/Play/Rest).

## Constraints
- **Technical**: Must persist to `localStorage` alongside existing stats.
- **Product**: 
    - Name limit: **50 characters**.
    - Reset must be guarded by a confirmation prompt.

## Open Questions
- **Decision: Static Welcome Text**
  - Rationale: Simplicity for the MVP; can be revisited if customization is needed later.
