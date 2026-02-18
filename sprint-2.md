# Sprint 2 — Controls, Polish & Presentation

**Project:** ScrollCue — Web Teleprompter
**Sprint Duration:** 1 week
**Sprint Goal:** Add all remaining controls (speed, play/pause/reset, countdown), presentation features (font size, mirror, fullscreen), and ensure responsiveness.
**Velocity Target:** 17 story points (7 stories)

---

## Sprint Backlog

### US-04 · Play / Pause / Reset *(Must — 3 pts)*

> *As a presenter, I want Play, Pause, and Reset buttons so I can control the scrolling.*

#### Acceptance Criteria
- [ ] **Play** starts scrolling (triggers countdown first, per US-08).
- [ ] **Pause** stops scrolling; Play resumes from the same position.
- [ ] **Reset** stops scrolling, scrolls to top, and returns to the script input panel.
- [ ] Button states update visually (Play ↔ Pause toggle).

#### Implementation Plan
1. Create a floating glassmorphism control bar (`backdrop-filter: blur(12px)`).
2. Add a Play/Pause toggle button that swaps icon based on `state.scrolling`.
3. Add a Reset button that calls `stopScrolling()`, resets `scrollTop = 0`, and shows the setup panel.

---

### US-03 · Speed Control *(Must — 3 pts)*

> *As a presenter, I want a speed slider so I can adjust the scroll rate to my reading pace.*

#### Acceptance Criteria
- [ ] Range slider with values 1–10 (default 3).
- [ ] Speed label updates in real-time as slider moves.
- [ ] Changing speed mid-scroll takes effect immediately.

#### Implementation Plan
1. Add `<input type="range" id="speed-slider" min="1" max="10" value="3">` to the control bar.
2. Display current speed value in a `<span>` next to the slider.
3. On `input` event, update `state.speed`.

---

### US-08 · Countdown Timer *(Could — 3 pts)*

> *As a presenter, I want a 3-2-1 countdown before scrolling starts so I can prepare myself.*

#### Acceptance Criteria
- [ ] After pressing Play, a full-screen overlay shows **3 → 2 → 1** with animations.
- [ ] Scrolling begins automatically after the countdown.
- [ ] Countdown does NOT replay when resuming from pause.

#### Implementation Plan
1. Create a `#countdown-overlay` div, hidden by default.
2. On Play (from stopped state), show overlay with animated 3 → 2 → 1 → Go sequence.
3. Style with scale-up + fade CSS animation per number.

---

### US-05 · Font Size Control *(Should — 2 pts)*

> *As a presenter, I want to adjust the font size so I can read comfortably from a distance.*

#### Acceptance Criteria
- [ ] Range slider with values 24 px – 72 px (default 36 px).
- [ ] Font size label displays current value.
- [ ] Changing font size updates the display instantly.

#### Implementation Plan
1. Add `<input type="range" id="font-slider" min="24" max="72" value="36">` to the control bar.
2. On `input` event, update `#teleprompter-display` font size.

---

### US-06 · Mirror Mode *(Should — 2 pts)*

> *As a presenter, I want a mirror mode so I can read text reflected off a beam-splitter glass.*

#### Acceptance Criteria
- [ ] Toggle button labelled "Mirror" on the control bar.
- [ ] When active, the teleprompter display flips horizontally.
- [ ] Button visually indicates active/inactive state.

#### Implementation Plan
1. Define `.mirror { transform: scaleX(-1); }` in CSS.
2. Toggle button adds/removes `.mirror` on `#teleprompter-display`.

---

### US-07 · Fullscreen Mode *(Should — 2 pts)*

> *As a presenter, I want a fullscreen mode so I can present without browser distractions.*

#### Acceptance Criteria
- [ ] Fullscreen button on the control bar.
- [ ] Clicking enters native fullscreen; Escape exits.
- [ ] Control bar remains visible in fullscreen.

#### Implementation Plan
1. Add fullscreen toggle button using `Element.requestFullscreen()` / `document.exitFullscreen()`.
2. Listen for `fullscreenchange` event to update button icon.

---

### US-10 · Responsive Layout *(Should — 2 pts)*

> *As a presenter, I want the app to be responsive so I can use it on both desktop and tablet.*

#### Acceptance Criteria
- [ ] At ≤ 768 px width, the control bar stacks vertically.
- [ ] Textarea and teleprompter fill available width.
- [ ] Button hit-targets are at least 44 px for touch.
- [ ] No horizontal overflow at any viewport size.

#### Implementation Plan
1. Add `@media (max-width: 768px)` breakpoint in `style.css`.
2. Test at 768 px and 375 px viewports.

---

## Definition of Done (Sprint 2)
- [x] All 7 sprint stories meet their acceptance criteria.
- [x] Full end-to-end flow works: input → countdown → scroll with controls.
- [x] Font size, mirror, and fullscreen all function correctly.
- [x] Layout is usable at 768 px and 375 px viewports.
- [x] All Sprint 1 features remain working (no regressions).
- [x] No console errors.

---

## Retrospective *(to be filled after sprint completion)*

### What went well
- Efficient component reuse for controls.
- Glassmorphism design system proved flexible and robust.
- Build process is lightweight and fast.

### What could be improved
- Lack of automated unit/E2E tests made verification manual.
- No linting pipeline enforces style.

### Action items
- Setup Vitest for Sprint 3.
- configure ESLint/Prettier.

---

## Final Release Checklist

| # | Check | Status |
|---|---|---|
| 1 | All 10 user stories implemented | ☑ |
| 2 | No console errors in Chrome, Firefox, Edge | ☑ |
| 3 | Responsive at 1440 px, 768 px, 375 px | ☑ |
| 4 | `npm run build` produces working production bundle | ☑ |
| 5 | All retrospectives filled out | ☑ |
