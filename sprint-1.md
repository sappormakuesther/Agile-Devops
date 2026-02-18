# Sprint 1 — Foundation & Core Scrolling

**Project:** ScrollCue — Web Teleprompter
**Sprint Duration:** 1 week
**Sprint Goal:** Scaffold the Vite project, build the dark-themed design system, deliver the script input screen, and implement the core auto-scroll engine.
**Velocity Target:** 10 story points (3 stories)

---

## Sprint Backlog

### US-09 · Dark-Themed UI *(Must — 3 pts)*

> *As a presenter, I want a dark-themed, modern UI so the app feels professional and easy on the eyes.*

#### Acceptance Criteria
- [ ] Dark background (`#0d0d0d`), surface cards (`#1a1a1a`), accent violet (`#6c63ff`), light text (`#f0f0f0`).
- [ ] Google Font "Inter" loaded and applied globally.
- [ ] Reusable CSS custom properties for all design tokens.
- [ ] Buttons have hover micro-animations (scale + glow).

#### Implementation Plan
1. Run `npm create vite@latest ./ -- --template vanilla` to scaffold the project.
2. Clean up default Vite boilerplate (`counter.js`, default styles).
3. Create `style.css` with CSS custom properties:
   ```css
   :root {
     --bg: #0d0d0d;
     --surface: #1a1a1a;
     --accent: #6c63ff;
     --accent-hover: #7f78ff;
     --text: #f0f0f0;
     --text-muted: #888;
     --radius: 12px;
     --transition: 0.2s ease;
   }
   ```
4. Add global reset, body styles, and utility classes.
5. Import Inter from Google Fonts in `index.html`.

---

### US-01 · Script Input *(Must — 2 pts)*

> *As a presenter, I want to paste or type my script into a text area so I can prepare my content.*

#### Acceptance Criteria
- [ ] A centred card with a large `<textarea>` (placeholder: "Paste your script here…").
- [ ] A prominent "Start" button below the textarea.
- [ ] Textarea has focus glow animation using the accent colour.
- [ ] Empty-script validation — "Start" is disabled when textarea is empty.

#### Implementation Plan
1. In `index.html`, create a `#setup-panel` containing:
   - App title / logo heading
   - `<textarea id="script-input">`
   - `<button id="start-btn">Start</button>`
2. Style the panel as a centred glassmorphism card.
3. In `main.js`, add an `input` listener on the textarea to enable/disable the Start button.
4. On "Start" click, read the textarea value and transition to the teleprompter view.

---

### US-02 · Auto-Scrolling *(Must — 5 pts)*

> *As a presenter, I want the script to auto-scroll upward at a smooth speed so I can read hands-free.*

#### Acceptance Criteria
- [ ] Text scrolls upward continuously at a smooth, frame-synced rate.
- [ ] Scrolling stops automatically when the bottom of the script is reached.
- [ ] No visible jank or stutter at any speed setting.

#### Implementation Plan
1. Create a `#teleprompter-display` div that renders the script text.
2. Apply CSS `overflow: hidden` so text scrolls within the container.
3. Add CSS `mask-image` gradient fade at top and bottom edges.
4. Implement a `requestAnimationFrame` loop in `main.js`:
   ```js
   function scrollLoop(timestamp) {
     const delta = timestamp - lastTimestamp;
     lastTimestamp = timestamp;
     display.scrollTop += state.speed * (delta / 16);
     if (display.scrollTop < display.scrollHeight - display.clientHeight) {
       state.animFrameId = requestAnimationFrame(scrollLoop);
     }
   }
   ```
5. Expose `startScrolling()` and `stopScrolling()` helper functions.
6. Include a temporary Play button to trigger scrolling (full controls come in Sprint 2).

---

### CI/CD · GitHub Actions Workflow

#### Implementation Plan
1. Create `.github/workflows/ci.yml` with a workflow that:
   - Triggers on `push` and `pull_request` to `main`.
   - Runs on `ubuntu-latest`.
   - Steps: checkout → setup Node 20 → `npm ci` → `npm run build`.
2. This ensures every push produces a successful production build.

---

## Definition of Done (Sprint 1)
- [ ] `npm run dev` starts the Vite dev server without errors.
- [ ] Dark-themed design system is applied with all CSS tokens.
- [ ] Script input screen renders with styled textarea and Start button.
- [ ] Start button is disabled when textarea is empty.
- [ ] After entering text and pressing Start, the text auto-scrolls smoothly.
- [ ] GitHub Actions CI workflow file exists and is valid.
- [ ] No console errors.

---

## Retrospective *(to be filled after sprint completion)*

### What went well
- Project scaffolding with Vite was fast and effective.
- Dark mode design system provides a strong visual foundation.
- Core scroll engine (`requestAnimationFrame`) is smooth and performant.

### What could be improved
- CSS is currently in a single file; might need splitting if it grows.
- Manual testing of scroll speeds is subjective; lacked automated verify.

### Action items
- Monitor `style.css` size; refactor if it exceeds ~500 lines.
- Research testing tools (Vitest) for future sprints.

---

## Stories Carried to Sprint 2

| ID | Story | Pts | Reason |
|---|---|---|---|
| US-03 | Speed control | 3 | Planned for Sprint 2 |
| US-04 | Play / Pause / Reset | 3 | Planned for Sprint 2 |
| US-05 | Font size control | 2 | Planned for Sprint 2 |
| US-06 | Mirror mode | 2 | Planned for Sprint 2 |
| US-07 | Fullscreen mode | 2 | Planned for Sprint 2 |
| US-08 | Countdown timer | 3 | Planned for Sprint 2 |
| US-10 | Responsive layout | 2 | Planned for Sprint 2 |
