# PROMPTS.md

## AI Assistance Log

This document records the prompts used with an AI coding assistant during development of this project, as requested in the assignment instructions.

## Scope

- Project: Pet Gallery (React + TypeScript)
- AI Usage: Implementation support, debugging, UI polish, API integration, and requirement validation
- Human Role: Direction, acceptance/rejection of changes, manual review, and final submission decisions

## Prompt Log (Chronological Summary)

1. Project completion
- Prompt intent: Understand the existing codebase and finish remaining work end-to-end.
- Outcome: Full audit was performed; lint/build issues were fixed; strict TypeScript + styled-components typing issues were resolved.

2. Data relevance fix
- Prompt intent: Ensure card images match pet names/details.
- Outcome: Mock data image mapping was changed from generic random photos to animal-tagged sources.

3. Use real APIs
- Prompt intent: Replace placeholder/mock behavior with free, real animal data APIs.
- Outcome: Integrated TheCatAPI + Dog CEO + Wikipedia summaries and mapped responses into app data model.

4. Improve breed/image consistency
- Prompt intent: Reduce mismatches between title/details and displayed image.
- Outcome: Added stricter source selection and filtering to prefer breed-relevant images.

5. UI/UX enhancement
- Prompt intent: Improve visual design quality and interactions.
- Outcome: Introduced a refined theme, improved typography/colors, loading skeletons, and subtle motion effects.

6. Route transitions
- Prompt intent: Add smooth page transition animations between routes.
- Outcome: Added animated route viewport keyed by pathname with reduced-motion support.

7. Download bug fix (ZIP workflow)
- Prompt intent: Fix download failure when selecting multiple images.
- Outcome: Improved ZIP download pipeline and handling for cross-origin image constraints.

8. ZIP-only requirement
- Prompt intent: Avoid opening multiple tabs and keep downloads as a single ZIP.
- Outcome: Removed direct per-image fallback and preserved ZIP-only behavior for multi-select downloads.

9. Download reliability improvement
- Prompt intent: Resolve remaining ZIP failures on blocked image hosts.
- Outcome: Added CORS-friendly proxy retry for blocked hosts while keeping single-ZIP behavior.

10. Assignment requirement verification
- Prompt intent: Verify all listed challenge requirements are satisfied and complete missing parts.
- Outcome: Added a dedicated About Me page content structure, introduced a proper 404 page, wired fallback routing, and improved code documentation where needed.

## Representative Prompt Examples

- "Understand the whole context and complete the remaining work."
- "Use real animal data from free online APIs for cards."
- "Improve the overall UI with skeletons, motion, and better theme."
- "Download is not working; fix it."
- "Do not open different tabs; keep one ZIP download."
- "Check if all challenge requirements are fulfilled; if not, complete them."