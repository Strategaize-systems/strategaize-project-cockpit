# Frontend Rules

## Purpose

These rules define the default expectations for frontend work inside Strategaize Dev System projects.

They are especially relevant for projects using:
- Next.js
- Tailwind CSS
- shadcn/ui

## Frontend scope

Frontend work may include:
- page structure
- layout
- navigation
- components
- forms
- tables
- dashboard views
- empty and error states
- copy and content presentation
- UI consistency improvements

## Core rules

### 1. Respect scope
Frontend work should reflect the actual scope of the active slice or feature.

Do not add UI work just because a screen could look nicer.

### 2. Keep UI practical
Do not overdesign internal tools.
Prioritize clarity and usefulness over visual excess.

### 3. Preserve consistency
Use consistent:
- spacing
- naming
- visual hierarchy
- component behavior
- interaction patterns

### 4. Prefer reusable structure
Do not create unnecessary one-off complexity if an existing reusable pattern is enough.

### 5. Treat UI changes as controlled changes
UI changes should not casually damage unrelated views, states, or navigation flows.

### 6. Include non-happy states
Frontend work should consider where relevant:
- loading states
- empty states
- error states
- success or completion feedback

### 7. Prefer maintainability
The UI should remain understandable and easy to refine later.

### 8. Preserve responsiveness
Frontend work should not silently degrade smaller screens, common breakpoints, or practical viewport usage.

### 9. Improve clarity before polish
When tradeoffs exist, choose:
- better readability
- better usability
- clearer hierarchy
over visual decoration.

## Frontend anti-patterns

Avoid:
- flashy complexity without benefit
- deeply inconsistent component choices
- layout sprawl
- mixed unrelated UI changes in one work unit
- ignoring empty or error states where they matter
- unnecessary redesign when refinement is enough
- introducing new UI patterns without a clear reason

## UI consistency expectation

A good frontend outcome should feel:
- clear
- stable
- readable
- intentional
- easy to extend later

## Outcome standard

Frontend work should improve visibility, usability, and control without adding unnecessary design or structural complexity.

## Frontend completion reporting requirements

Frontend work must follow the mandatory completion reporting rule in full.

In addition, frontend completion reports must explicitly distinguish between:
- manually authored frontend files
- generated scaffold or framework files
- configuration files
- route files
- shared UI files
- utility files

If a frontend project was initialized or scaffolded, the report must clearly state:
- where the frontend root lives
- which command created it
- which important root files now exist
- whether the dev server was only verified or is still actively running
- which port was actually used during verification

Do not claim:
- "runs on port X"
- "responsive works"
- "all routes work"
unless that was explicitly verified.

If verification was partial, state the limitation clearly.

## Frontend problem classification

The following must not be hidden under "Open points" alone if they affected the current work step:
- dev server could not start normally
- lock files or stale processes blocked runtime verification
- browser rendering was not directly checked
- responsive behavior was not directly checked
- localStorage, URL state, or persistence behavior was not directly checked
- route navigation was inferred from build success but not tested in browser
- a key UI state was described but not directly verified

If any of the above occurred, they must be reflected under:
- Problems found
or
- Runtime verification summary with explicit confidence limitation

## Verification honesty rule

Frontend reporting must distinguish between:
- build verification
- static code verification
- browser rendering verification
- interaction verification
- persistence verification
- responsive verification

Build success is not the same as browser verification.
Compilation success is not the same as runtime behavior confirmation.
Described UI behavior is not the same as verified UI behavior.

If only part of the frontend was verified, state exactly which part.