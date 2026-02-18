/* ========================================
   ScrollCue — Main Application Logic
   Sprint 1: US-09, US-01, US-02
   ======================================== */

import './style.css';

// --- DOM Elements ---
const setupPanel = document.getElementById('setup-panel');
const teleprompterPanel = document.getElementById('teleprompter-panel');
const scriptInput = document.getElementById('script-input');
const startBtn = document.getElementById('start-btn');
const display = document.getElementById('teleprompter-display');
const controlBar = document.getElementById('control-bar');
const playPauseBtn = document.getElementById('play-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const countdownOverlay = document.getElementById('countdown-overlay');

// --- State ---
const state = {
  scrolling: false,
  speed: 3,
  fontSize: 36,
  mirrored: false,
  animFrameId: null,
  lastTimestamp: 0,
  hasStartedOnce: false, // tracks if we need countdown
};

// ========================================
// US-01: Script Input
// ========================================

// Enable/disable Start button based on textarea content
scriptInput.addEventListener('input', () => {
  startBtn.disabled = scriptInput.value.trim().length === 0;
});

// Start button → transition to teleprompter view
startBtn.addEventListener('click', () => {
  const script = scriptInput.value.trim();
  if (!script) return;

  // Inject script text into display
  display.textContent = script;

  // Switch panels
  setupPanel.classList.remove('active');
  teleprompterPanel.classList.add('active');
  controlBar.classList.add('visible');

  // Reset scroll
  display.scrollTop = 0;
  state.hasStartedOnce = false;

  // Auto-start with countdown
  triggerCountdown();
});

// ========================================
// US-02: Auto-Scrolling Engine
// ========================================

function startScrolling() {
  if (state.scrolling) return;
  state.scrolling = true;
  state.lastTimestamp = performance.now();
  playPauseBtn.querySelector('.btn-label').textContent = '⏸';
  state.animFrameId = requestAnimationFrame(scrollLoop);
}

function stopScrolling() {
  state.scrolling = false;
  playPauseBtn.querySelector('.btn-label').textContent = '▶';
  if (state.animFrameId) {
    cancelAnimationFrame(state.animFrameId);
    state.animFrameId = null;
  }
}

function scrollLoop(timestamp) {
  if (!state.scrolling) return;

  const delta = timestamp - state.lastTimestamp;
  state.lastTimestamp = timestamp;

  // Pixels per frame, normalized to ~60fps
  display.scrollTop += state.speed * (delta / 16);

  // Stop at bottom
  if (display.scrollTop >= display.scrollHeight - display.clientHeight) {
    stopScrolling();
    return;
  }

  state.animFrameId = requestAnimationFrame(scrollLoop);
}

// ========================================
// Countdown Timer (part of US-02 flow)
// ========================================

function triggerCountdown() {
  let count = 3;
  countdownOverlay.textContent = count;
  countdownOverlay.classList.add('active');

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownOverlay.textContent = count;
      // Re-trigger animation
      countdownOverlay.classList.remove('active');
      void countdownOverlay.offsetWidth; // force reflow
      countdownOverlay.classList.add('active');
    } else if (count === 0) {
      countdownOverlay.textContent = 'Go!';
      countdownOverlay.classList.remove('active');
      void countdownOverlay.offsetWidth;
      countdownOverlay.classList.add('active');
    } else {
      clearInterval(interval);
      countdownOverlay.classList.remove('active');
      state.hasStartedOnce = true;
      startScrolling();
    }
  }, 800);
}

// ========================================
// Play / Pause / Reset Controls
// ========================================

playPauseBtn.addEventListener('click', () => {
  if (state.scrolling) {
    stopScrolling();
  } else {
    if (!state.hasStartedOnce) {
      triggerCountdown();
    } else {
      startScrolling();
    }
  }
});

resetBtn.addEventListener('click', () => {
  stopScrolling();
  display.scrollTop = 0;
  controlBar.classList.remove('visible');
  teleprompterPanel.classList.remove('active');
  setupPanel.classList.add('active');
  state.hasStartedOnce = false;
});
