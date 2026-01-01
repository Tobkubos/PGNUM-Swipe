let lastTime = 0;
let correction = 1;
export function calculateCorrection(timestamp) {
    if (!timestamp) timestamp = 0;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    correction = deltaTime / (1000 / 60);

    if (isNaN(correction) || correction > 5) correction = 1;
}

export function getCorrection() {
    return correction
}