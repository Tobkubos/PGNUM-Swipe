import { SceneSwitchManager, state } from "../sceneManager.js";
import { sceneTransitionAnimationCanvas, transitionCtx } from "../UI/ui_other.js";
import { backgroundDarker, font } from "./colors.js";
import { correction } from "./timeManager.js";

let speed = 5;
export function animateSceneTransition(newSceneState) {
    const canvas = sceneTransitionAnimationCanvas;
    canvas.style.display = "block";

    let progress = 0;
    let phase = 0;


    function draw() {
        transitionCtx.clearRect(0, 0, canvas.width, canvas.height);
        transitionCtx.fillStyle = backgroundDarker;

        if (phase == 0) {
            const y = canvas.height - progress;
            transitionCtx.fillRect(0, y, canvas.width, progress);
        }
        else if (phase == 1) {
            transitionCtx.fillRect(0, -progress, canvas.width, canvas.height);
        }
    }

    function loop() {
        // ---- FAZA 1 ----
        if (phase == 0) {
            progress += speed * correction;

            if (progress >= canvas.height + speed) {
                progress = 0;
                phase = 1;
                state.playerScene = newSceneState;
                SceneSwitchManager();
                setTimeout(() => {
                    phase = 1;
                    requestAnimationFrame(loop);
                }, 200);
                
                return;
            }
        }
        // ---- FAZA 2 ----
        else if (phase === 1) {
            progress += speed * correction;

            if (progress >= canvas.height + speed) {
                transitionCtx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = "none";
                return;
            }
        }
        draw();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}