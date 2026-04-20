# Plan - Sickness Visibility & Health Status

## Task Groups

1. Discovery and Design
   - Define CSS variables for the "Sick" color palette.
   - Design the shivering animation and floating icon layout.
   - Resolve open questions about animation timing.

2. Implementation - Pet Visuals
   - Update `Pet` component CSS to support a `[class.sick]` or similar binding.
   - Implement the greenish/pale color shift.
   - Implement the constant shivering micro-animation.
   - Implement the sick mouth UI (downturned shape) via a new `mouth-sick` CSS class or state.
   - Add floating icons (thermometer, dizzy) to the pet template with random appearance/disappearance logic.

3. Implementation - Health Status Badge
   - Create/Update status badge UI elements.
   - Add "Healthy" / "Ill" labels with appropriate color coding.
   - Implement the pulse animation for the "Ill" state.

4. Validation and Polish
   - Ensure smooth transitions between states.
   - Verify responsiveness (icons don't overlap with meters).
   - Add unit tests for state-to-visual bindings.
