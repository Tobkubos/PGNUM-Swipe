import { canvas } from "../UI/ui_other.js";

export function shakeScreen(duration = 900, magnitude = 12) {
    let start = performance.now();

    function loop(now) {
        const elapsed = now - start;
        if (elapsed > duration) {
            canvas.style.transform = "translate(0px, 0px)";
            return;
        }
        const x = (Math.random() - 0.5) * magnitude * 2;
        const y = (Math.random() - 0.5) * magnitude * 2;

        canvas.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}
