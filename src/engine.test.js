import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ScrollEngine } from './engine.js';

describe('ScrollEngine', () => {
    let mockDisplay;
    let engine;
    let onStopMock;

    beforeEach(() => {
        // Mock DOM element with scroll properties
        mockDisplay = {
            scrollTop: 0,
            scrollHeight: 1000,
            clientHeight: 500, // Visible height
        };
        onStopMock = vi.fn();
        engine = new ScrollEngine(mockDisplay, onStopMock);

        // Mock RAF
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize with default state', () => {
        expect(engine.state.scrolling).toBe(false);
        expect(engine.state.speed).toBe(3);
    });

    it('should start scrolling when start() is called', () => {
        engine.start();
        expect(engine.state.scrolling).toBe(true);
        expect(engine.state.animFrameId).toBeTruthy();
    });

    it('should stop scrolling when stop() is called', () => {
        engine.start();
        engine.stop();
        expect(engine.state.scrolling).toBe(false);
        expect(engine.state.animFrameId).toBeNull();
        expect(onStopMock).toHaveBeenCalled();
    });

    it('should update scrollTop over time', () => {
        engine.start();

        // Simulate time passing and RAF firing
        // We need to trigger the tick manually or rely on fake timers for requestAnimationFrame?
        // Vitest fake timers usually handle setTimeout/setInterval, but for RAF we might need to be specific.
        // However, the tick uses performance.now(). To strictly test the math:

        // Force a tick with specific timestamp
        engine.state.lastTimestamp = 1000;
        engine.tick(1016); // 16ms delta

        // speed 3 * (16/16) = 3 pixels
        expect(mockDisplay.scrollTop).toBeCloseTo(3);
    });

    it('should auto-stop when reaching bottom', () => {
        engine.start();
        mockDisplay.scrollTop = 500; // scrollHeight(1000) - clientHeight(500) = 500 max scroll

        engine.tick(2000);

        expect(engine.state.scrolling).toBe(false);
        expect(onStopMock).toHaveBeenCalled();
    });

    it('should update speed', () => {
        engine.setSpeed(10);
        expect(engine.state.speed).toBe(10);
    });
});
