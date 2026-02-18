/* ========================================
   ScrollCue — Main Application Logic
   Sprint 1: US-09, US-01, US-02
   Sprint 2: US-03, US-04, US-05, US-06, US-07, US-08, US-10
   ======================================== */

import './style.css';
import { ScrollEngine } from './engine.js';

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

// --- State & Engine ---
const engine = new ScrollEngine(display, () => {
  // onStop callback (auto-stop)
  playPauseBtn.querySelector('.btn-label').textContent = '▶';
});

const appState = {
  fontSize: 36,
  mirrored: false,
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
  display.style.fontSize = appState.fontSize + 'px';

  setupPanel.classList.remove('active');
  teleprompterPanel.classList.add('active');
  controlBar.classList.add('visible');

  display.scrollTop = 0;
  appState.hasStartedOnce = false;

  triggerCountdown();
});

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
      appState.hasStartedOnce = true;

      // Update UI to playing state
      playPauseBtn.querySelector('.btn-label').textContent = '⏸';
      engine.start();
    }
  }, 800);
}

// ========================================
// US-04: Play / Pause / Reset
// ========================================

playPauseBtn.addEventListener('click', () => {
  if (engine.state.scrolling) {
    engine.stop();
    playPauseBtn.querySelector('.btn-label').textContent = '▶';
  } else {
    if (!appState.hasStartedOnce) {
      triggerCountdown();
    } else {
      playPauseBtn.querySelector('.btn-label').textContent = '⏸';
      engine.start();
    }
  }
});

resetBtn.addEventListener('click', () => {
  engine.stop();
  playPauseBtn.querySelector('.btn-label').textContent = '▶';

  display.scrollTop = 0;
  display.classList.remove('mirror');
  appState.mirrored = false;
  mirrorBtn.classList.remove('active');
  controlBar.classList.remove('visible');
  teleprompterPanel.classList.remove('active');
  setupPanel.classList.add('active');
  appState.hasStartedOnce = false;
});

// ========================================
// US-03: Speed Control
// ========================================

speedSlider.addEventListener('input', () => {
  const val = Number(speedSlider.value);
  engine.setSpeed(val);
  speedValue.textContent = val;
});
// Init speed
engine.setSpeed(Number(speedSlider.value));


// ========================================
// US-05: Font Size Control
// ========================================

fontSlider.addEventListener('input', () => {
  appState.fontSize = Number(fontSlider.value);
  display.style.fontSize = appState.fontSize + 'px';
  fontValue.textContent = fontSlider.value + 'px';
});

// ========================================
// US-06: Mirror Mode
// ========================================

mirrorBtn.addEventListener('click', () => {
  appState.mirrored = !appState.mirrored;
  display.classList.toggle('mirror', appState.mirrored);
  mirrorBtn.classList.toggle('active', appState.mirrored);
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
