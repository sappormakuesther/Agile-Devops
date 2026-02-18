# Sprint 0 — Planning & Setup

**Project:** ScrollCue — Web Teleprompter
**Sprint Duration:** 1 week
**Sprint Goal:** Define the product vision, build the full product backlog, establish standards, and plan Sprint 1.

---

## Product Vision

**ScrollCue** is a simple, single-page web teleprompter that lets presenters paste a script and have it auto-scroll at a configurable speed — delivering a distraction-free, professional reading experience entirely in the browser with no backend required.

---

## Product Backlog

| ID | User Story | Priority | Story Pts |
|---|---|---|---|
| US-01 | As a presenter, I want to paste or type my script into a text area so I can prepare my content. | Must | 2 |
| US-02 | As a presenter, I want the script to auto-scroll upward at a smooth speed so I can read hands-free. | Must | 5 |
| US-03 | As a presenter, I want a speed slider so I can adjust the scroll rate to my reading pace. | Must | 3 |
| US-04 | As a presenter, I want Play, Pause, and Reset buttons so I can control the scrolling. | Must | 3 |
| US-05 | As a presenter, I want to adjust the font size so I can read comfortably from a distance. | Should | 2 |
| US-06 | As a presenter, I want a mirror mode so I can read text reflected off a beam-splitter glass. | Should | 2 |
| US-07 | As a presenter, I want a fullscreen mode so I can present without browser distractions. | Should | 2 |
| US-08 | As a presenter, I want a 3-2-1 countdown before scrolling starts so I can prepare myself. | Could | 3 |
| US-09 | As a presenter, I want a dark-themed, modern UI so the app feels professional and easy on the eyes. | Must | 3 |
| US-10 | As a presenter, I want the app to be responsive so I can use it on both desktop and tablet. | Should | 2 |

**Total backlog:** 10 stories · 27 story points

---

## Backlog Refinement — Acceptance Criteria

### US-01 · Script Input *(Must — 2 pts)*
- [ ] A centred card with a large `<textarea>` (placeholder: "Paste your script here…").
- [ ] A prominent "Start" button below the textarea.
- [ ] Textarea has focus glow animation using the accent colour.
- [ ] Empty-script validation — "Start" is disabled when textarea is empty.

### US-02 · Auto-Scrolling *(Must — 5 pts)*
- [ ] Text scrolls upward continuously at a smooth, frame-synced rate.
- [ ] Scrolling stops automatically when the bottom of the script is reached.
- [ ] No visible jank or stutter at any speed setting.

### US-03 · Speed Control *(Must — 3 pts)*
- [ ] Range slider with values 1–10 (default 3).
- [ ] Speed label updates in real-time as slider moves.
- [ ] Changing speed mid-scroll takes effect immediately (no restart needed).

### US-04 · Play / Pause / Reset *(Must — 3 pts)*
- [ ] **Play** starts scrolling (triggers countdown first, per US-08).
- [ ] **Pause** stops scrolling; Play resumes from the same position.
- [ ] **Reset** stops scrolling, scrolls to top, and returns to the script input panel.
- [ ] Button states update visually (Play ↔ Pause toggle).

### US-05 · Font Size Control *(Should — 2 pts)*
- [ ] Range slider with values 24 px – 72 px (default 36 px).
- [ ] Font size label displays current value.
- [ ] Changing font size updates the display instantly.

### US-06 · Mirror Mode *(Should — 2 pts)*
- [ ] Toggle button labelled "Mirror" on the control bar.
- [ ] When active, the teleprompter display flips horizontally.
- [ ] Button visually indicates active/inactive state.
- [ ] All other controls work normally while mirrored.

### US-07 · Fullscreen Mode *(Should — 2 pts)*
- [ ] Fullscreen button on the control bar.
- [ ] Clicking enters the browser's native fullscreen.
- [ ] Pressing Escape or clicking again exits fullscreen.
- [ ] Control bar remains visible in fullscreen.

### US-08 · Countdown Timer *(Could — 3 pts)*
- [ ] After pressing Play, a full-screen overlay shows **3 → 2 → 1** with animations.
- [ ] Scrolling begins automatically after the countdown.
- [ ] Countdown does NOT replay when resuming from pause (only on first play or after reset).

### US-09 · Dark-Themed UI *(Must — 3 pts)*
- [ ] Dark background (`#0d0d0d`), surface cards (`#1a1a1a`), accent violet (`#6c63ff`).
- [ ] Google Font "Inter" loaded and applied globally.
- [ ] Reusable CSS custom properties for all design tokens.
- [ ] Buttons have hover micro-animations (scale + glow).

### US-10 · Responsive Layout *(Should — 2 pts)*
- [ ] At ≤ 768 px width, the control bar stacks vertically.
- [ ] Textarea and teleprompter fill available width with appropriate padding.
- [ ] Button hit-targets are at least 44 px for touch devices.
- [ ] No horizontal overflow at any viewport size.

---

## Definition of Done (DoD)

A user story is **done** when ALL of the following are satisfied:

1.  All acceptance criteria for the story are met.
2.  Code is clean, commented where non-obvious, and follows project conventions.
3.  Feature works in Chrome and Edge (minimum).
4.  No new console errors or warnings introduced.
5.  Any UI changes are visually consistent with the dark theme design system.
6.  Feature has been demonstrated working in the browser.

---

## Sprint 1 Plan

The following **3 stories** (10 pts) are selected for Sprint 1 based on priority and dependency order:

| ID | Story | Pts | Rationale |
|---|---|---|---|
| US-09 | Dark-Themed UI | 3 | Foundation — design system must exist before any UI work. |
| US-01 | Script Input | 2 | Entry point — users need a way to enter their script first. |
| US-02 | Auto-Scrolling | 5 | Core value — the scroll engine is the heart of the app. |

**Sprint 1 velocity target:** 10 story points

> [!NOTE]
> US-02 depends on US-01 (needs script text) and US-09 (needs the dark theme foundation). Stories are ordered accordingly.

---

## Retrospective *(to be filled after sprint completion)*

### What went well
- *TBD*

### What could be improved
- *TBD*

### Action items
- *TBD*

---

## Stories Carried to Sprint 1

| ID | Story | Reason |
|---|---|---|
| US-09 | Dark-Themed UI | Selected for Sprint 1 — foundation |
| US-01 | Script Input | Selected for Sprint 1 — entry point |
| US-02 | Auto-Scrolling | Selected for Sprint 1 — core feature |
