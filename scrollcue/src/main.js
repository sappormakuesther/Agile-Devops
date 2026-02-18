/* ========================================
   ScrollCue — Main Application Logic
   Sprint 1: US-09, US-01, US-02
   Sprint 2: US-03, US-04, US-05, US-06, US-07, US-08, US-10
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

// Sprint 2 elements
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const fontSlider = document.getElementById('font-slider');
const fontValue = document.getElementById('font-value');
const mirrorBtn = document.getElementById('mirror-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// --- State ---
const state = {
  scrolling: false,
  speed: 3,
  fontSize: 36,
  mirrored: false,
  animFrameId: null,
  lastTimestamp: 0,
  hasStartedOnce: false,
};

// ========================================
// US-01: Script Input
// ========================================

scriptInput.addEventListener('input', () => {
  startBtn.disabled = scriptInput.value.trim().length === 0;
});

startBtn.addEventListener('click', () => {
  const script = scriptInput.value.trim();
  if (!script) return;

  display.textContent = script;
  display.style.fontSize = state.fontSize + 'px';

  setupPanel.classList.remove('active');
  teleprompterPanel.classList.add('active');
  controlBar.classList.add('visible');

  display.scrollTop = 0;
  state.hasStartedOnce = false;

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

  display.scrollTop += state.speed * (delta / 16);

  if (display.scrollTop >= display.scrollHeight - display.clientHeight) {
    stopScrolling();
    return;
  }

  state.animFrameId = requestAnimationFrame(scrollLoop);
}

// ========================================
// US-08: Countdown Timer
// ========================================

function triggerCountdown() {
  let count = 3;
  countdownOverlay.textContent = count;
  countdownOverlay.classList.add('active');

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownOverlay.textContent = count;
      countdownOverlay.classList.remove('active');
      void countdownOverlay.offsetWidth;
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
// US-04: Play / Pause / Reset
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
  display.classList.remove('mirror');
  state.mirrored = false;
  mirrorBtn.classList.remove('active');
  controlBar.classList.remove('visible');
  teleprompterPanel.classList.remove('active');
  setupPanel.classList.add('active');
  state.hasStartedOnce = false;
});

// ========================================
// US-03: Speed Control
// ========================================

speedSlider.addEventListener('input', () => {
  state.speed = Number(speedSlider.value);
  speedValue.textContent = speedSlider.value;
});

// ========================================
// US-05: Font Size Control
// ========================================

fontSlider.addEventListener('input', () => {
  state.fontSize = Number(fontSlider.value);
  display.style.fontSize = state.fontSize + 'px';
  fontValue.textContent = fontSlider.value + 'px';
});

// ========================================
// US-06: Mirror Mode
// ========================================

mirrorBtn.addEventListener('click', () => {
  state.mirrored = !state.mirrored;
  display.classList.toggle('mirror', state.mirrored);
  mirrorBtn.classList.toggle('active', state.mirrored);
});

// ========================================
// US-07: Fullscreen Mode
// ========================================

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.getElementById('app').requestFullscreen().catch(() => { });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  fullscreenBtn.classList.toggle('active', !!document.fullscreenElement);
  const label = fullscreenBtn.querySelector('.btn-label');
  label.textContent = document.fullscreenElement ? '⊠' : '⛶';
});
