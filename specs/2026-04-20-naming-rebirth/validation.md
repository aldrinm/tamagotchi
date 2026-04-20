# Validation - Naming & Rebirth

## Success Criteria
- [ ] Users are prompted to name their pet on the very first visit.
- [ ] Pets can only be named once per lifecycle.
- [ ] The pet's name is displayed correctly in the app header.
- [ ] The "Reset Game" button correctly clears all state and returns the user to the naming flow.
- [ ] No data is lost on browser refresh (name and stats remain).
- [ ] The name length is limited to 50 characters.

## Verification Checklist
- [ ] **Unit Tests**:
    - [ ] Verify `PetService` saves/loads name from storage.
    - [ ] Verify reset logic clears all relevant keys.
- [ ] **Manual Smoke Tests**:
    - [ ] Enter a name -> Refresh -> Name should persist.
    - [ ] Click Reset -> Cancel prompt -> Nothing should happen.
    - [ ] Click Reset -> Confirm -> App should return to Naming Modal.
    - [ ] Try to enter a very long name -> Should be capped at 50 chars.

## Test Plan
1. **Fresh Start Path**:
    - Open app in incognito (or clear storage).
    - Observe Naming Modal.
    - Enter "Pebble" and save.
    - Observe "Pebble" in header.
2. **Persistence Path**:
    - Play for a bit, then refresh.
    - Ensure name "Pebble" and stats are preserved.
3. **Reset Path**:
    - Click Reset in footer.
    - Verify confirmation prompt.
    - Confirm reset.
    - Verify app state is cleared and Naming Modal returns.

## Merge Gate
- Ready to merge when all "Fresh Start", "Persistence", and "Reset" scenarios pass manual validation and automated tests are green.
