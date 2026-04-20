# Plan - Naming & Rebirth

## Task Groups

1. **Discovery and Design**
   - Confirm naming modal UI design (simple input + "Give Name" button).
   - Design the reset confirmation prompt (native `confirm()` or custom modal).
   - Identify `localStorage` keys for the name.

2. **Implementation**
   - **State Logic**: 
     - Update `Pet` model to include an optional `name` field.
     - Add logic to detect "unnamed" state on startup.
   - **UI Components**:
     - Create Naming Modal component.
     - Add name display to Header component.
     - Add "Reset Game" button to Footer component.
   - **Persistence**:
     - Ensure name is saved on entry.
     - Implement `clearLocalData` for the reset functionality.
   - **Safeguards**:
     - Implement character length validation (max 50).
     - Add confirmation guard to the Reset action.

3. **Validation and Release Prep**
   - Update unit tests for state persistence.
   - Add component tests for naming and reset flows.
   - Verify "Welcome" flow triggers only when name is missing.
