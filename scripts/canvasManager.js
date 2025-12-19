export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export const off = new OffscreenCanvas(canvas.width, canvas.height);
export const offCtx = off.getContext("2d");