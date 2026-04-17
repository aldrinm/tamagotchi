---
name: next-phase-spec-scaffold
description: Finds the next implementation phase from specs/roadmap.md, creates a feature branch, gathers feature-spec details from the user, and scaffolds a dated specs directory with plan.md, requirements.md, and validation.md. Use when the user asks to start the next roadmap phase, set up feature spec docs, or bootstrap planning artifacts.
---

# Next Phase Spec Scaffold

## Purpose

Use this skill to kick off the next planned feature from the roadmap and prepare merge-ready specification artifacts before implementation starts.

## Required Inputs

Collect these from the user if missing:

1. Feature name slug (short kebab-case, e.g. `pet-mood-events`)
2. Branch naming preference (if no preference, use `feat/<feature-name>`)
3. Any hard constraints (deadline, non-goals, dependencies)

## Workflow

1. Read `specs/roadmap.md` and identify the next phase that is not complete.
2. Ask the user focused feature-spec questions before creating content:
   - What outcome should this feature deliver?
   - What is explicitly in scope and out of scope?
   - Are there UX, technical, or data constraints?
   - What risks or unknowns should be tracked?
3. Read `specs/mission.md` and `specs/tech-stack.md` and align decisions with them.
4. Create and checkout a branch for the work.
5. Create a new directory in `specs/` named `YYYY-MM-DD-feature-name`.
6. Create these files in that directory:
   - `plan.md`
   - `requirements.md`
   - `validation.md`
7. Populate files using the templates below.
8. Report back with branch name, directory path, and any open questions.

## File Templates

### `plan.md`

Use numbered task groups with concrete deliverables:

```markdown
# Plan - <feature title>

## Task Groups

1. Discovery and design
   - Confirm scope and constraints
   - Capture architecture approach
   - Resolve open questions

2. Implementation
   - Build core feature behavior
   - Add persistence/integration points
   - Add error handling and safeguards

3. Validation and release prep
   - Add/update tests
   - Verify acceptance criteria
   - Prepare PR notes
```

### `requirements.md`

Capture scope, decisions, and context:

```markdown
# Requirements - <feature title>

## Context
- Why this feature exists
- Link to roadmap phase and mission alignment

## Scope
- In scope
- Out of scope

## Decisions
- Decision: <what>
  - Rationale: <why>
  - Tradeoff: <impact>

## Constraints
- Technical constraints from `specs/tech-stack.md`
- Product constraints from user input

## Open Questions
- Items requiring follow-up
```

### `validation.md`

Define merge readiness:

```markdown
# Validation - <feature title>

## Success Criteria
- User-visible behavior works as intended
- No regressions in existing flows
- Implementation matches requirements

## Verification Checklist
- [ ] Unit/integration tests added or updated
- [ ] Manual test steps executed
- [ ] Edge cases covered
- [ ] Docs/specs updated

## Test Plan
1. Happy-path scenario(s)
2. Failure/edge scenario(s)
3. Regression checks

## Merge Gate
- Ready to merge when all checklist items are complete and no blocking questions remain.
```

## Quality Bar

- Keep language precise and implementation-oriented.
- Do not invent stack choices that conflict with `specs/tech-stack.md`.
- Ensure every planned task maps to a requirement and a validation step.
