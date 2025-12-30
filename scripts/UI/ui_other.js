import { currentUserState } from "../../db/DatabaseConfig.js"

const rewardType = document.querySelector("#reward-preview-header-info")
const rewardName = document.querySelector("#reward-name")

export function rewardPreviewNames(type, name){
    rewardType.innerHTML = type
    rewardName.innerHTML = name
}

let toastTimeout;
export function showToast(text) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = text;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export const off = new OffscreenCanvas(canvas.width, canvas.height);
export const offCtx = off.getContext("2d");