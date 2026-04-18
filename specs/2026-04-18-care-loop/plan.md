# Plan - Care Loop (Phase 2)

## Task Groups

1. Discovery and design
   - [ ] Confirm action deltas from `roadmap.md` and `mission.md`
   - [ ] Define UI button layout and styling (Angular components)
   - [ ] Plan integration with the existing `PetService` or equivalent state management

2. Implementation
   - [ ] Add `feed()`, `play()`, and `rest()` methods to the core game logic
   - [ ] Implement clamping logic for all three vitals
   - [ ] Update UI to include action buttons and connect them to logic
   - [ ] Ensure local persistence is updated immediately after an action

3. Validation and release prep
   - [ ] Add unit tests for action deltas in `pet.service.spec.ts`
   - [ ] Verify manual interaction flow (buttons update meters)
   - [ ] Check for edge cases (e.g., clicking rapidly)
   - [ ] Prepare PR notes and documentation updates
