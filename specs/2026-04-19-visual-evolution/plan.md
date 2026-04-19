# Plan - Visual Evolution (Advanced Aesthetics)

## Task Groups

1. Discovery and design
   - Confirm scope and constraints (Done in scaffold)
   - Capture architecture approach:
     - Use CSS classes (`.state-evolved`) to trigger advanced styles.
     - Use `::before` and `::after` for hair/glow to minimize DOM nodes.
   - Resolve open questions:
     - Finalize color palette for the "aura" effect.

2. Implementation
   - **Unique Blob Shape**: Update `.state-evolved` in `app.css` with custom `border-radius`.
   - **Hair Strands**: Implement styled pseudo-elements for the evolved state.
   - **Aura Effect**: Add `box-shadow` or `filter` based glow to the blob.
   - **Transitions**: Ensure `transition: all` covers the new properties.

3. Validation and release prep
   - Verify that the evolved state looks distinct in the browser.
   - Ensure `Normal` and `Sick` states are unaffected.
   - Run existing unit tests to ensure no logic regressions.
   - Prepare PR notes for "Visual Evolution".
