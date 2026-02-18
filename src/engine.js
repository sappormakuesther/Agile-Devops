export class ScrollEngine {
    constructor(displayElement, onStopCallback) {
        this.display = displayElement;
        this.onStop = onStopCallback;
        this.state = {
            scrolling: false,
            speed: 3,
            animFrameId: null,
            lastTimestamp: 0,
        };
        this.tick = this.tick.bind(this);
    }

    start() {
        if (this.state.scrolling) return;
        this.state.scrolling = true;
        this.state.lastTimestamp = performance.now();
        this.state.animFrameId = requestAnimationFrame(this.tick);
    }

    stop() {
        this.state.scrolling = false;
        if (this.state.animFrameId) {
            cancelAnimationFrame(this.state.animFrameId);
            this.state.animFrameId = null;
        }
        if (this.onStop) this.onStop();
    }

    setSpeed(value) {
        this.state.speed = Number(value);
    }

    tick(timestamp) {
        if (!this.state.scrolling) return;

        const delta = timestamp - this.state.lastTimestamp;
        this.state.lastTimestamp = timestamp;

        // Use a multiplier to make speed 1-10 feel right
        // Previous logic: speed * (delta / 16)
        this.display.scrollTop += this.state.speed * (delta / 16);

        // Auto-stop at bottom
        // We allow a small buffer or exact match
        if (this.display.scrollTop >= this.display.scrollHeight - this.display.clientHeight) {
            this.stop();
            return;
        }

        this.state.animFrameId = requestAnimationFrame(this.tick);
    }
}
