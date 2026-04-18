# Testing Strategy

This document outlines the multi-level validation strategy for the Tamagotchi project, ensuring high reliability and a playful, bug-free experience. To satisfy the project's testability rubric, we employ two primary levels of validation.

## Validation Levels

### Level 1: Automated Unit & Component Testing (High Granularity)
We use **Vitest** as our primary automated testing runner to verify the internal logic and state management of the pet.

- **Scope**:
    - **Core Game Logic**: Pure functions governing decay, action deltas, and state transition logic.
    - **Component Wiring**: Ensuring UI sensors (meters) and actuators (buttons) are correctly bound to the state.
    - **Persistence Layer**: Verifying that `localStorage` interactions are robust and handle edge cases (e.g., corrupted data).
- **Guidelines**:
    - **Deterministic Time**: Use `vi.useFakeTimers()` to test time-decay and sustain windows without real-time waits.
    - **Test Pyramid**: Prioritize unit tests for logic over heavy DOM-based component tests.
- **Execution**:
    ```bash
    npm test
    ```

### Level 2: Manual "Smoke" & User Flow Testing (High Fidelity)
Calculated manual tests ensure the game "feels" right and that complex user flows are coherent.

- **Scope**:
    - **Happy Path (The Life Cycle)**: Starting a new pet, caring for it through multiple cycles, and achieving `Evolved` state.
    - **Stress Testing (The Neglect Path)**: Allowing vitals to drop to zero and verifying critical `Sick` state recovery triggers.
    - **Persistence Check**: Refreshing the browser or closing the tab during various states to ensure "elapsed-time catch-up" functions as expected.
- **Validation Checklists**:
    - Refer to phase-specific checklists in [roadmap.md](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/roadmap.md) and [validation.md](file:///c:/Aldrin/projects/aldrinm/tamagotchi/specs/2026-04-17-foundations/validation.md).

## Testability Architecture
To keep the project testable:
1.  **Isolate Logic**: All math for decay and state transitions must live in testable services or pure functions, not embedded in component templates.
2.  **Mockable Time**: The application should use a central time source or inject the current time to allow for easy mocking in automated tests.
3.  **Predictable State**: State transitions are deterministic based on the current `Stats` and `lastUpdatedAt` timestamp.
