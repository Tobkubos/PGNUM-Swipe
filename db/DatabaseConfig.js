
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    getFirestore, doc, getDoc, setDoc, updateDoc, query, collection, orderBy, limit, getDocs, onSnapshot
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { updateUI } from "../scripts/sceneManager.js";
import { player } from "../main.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZvIq7NCMfETcFTx0W0nENSsORxyQuSII",
    authDomain: "swipedb-90629.firebaseapp.com",
    projectId: "swipedb-90629",
    storageBucket: "swipedb-90629.firebasestorage.app",
    messagingSenderId: "990318437008",
    appId: "1:990318437008:web:d0ecc31778dd81ff0eee15",
    measurementId: "G-ZEG2CGBFKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const currentUserState = {
    user: null,   // AUTH
    data: null,   // FIRESTORE
    unsubscribe: null
};

function setupAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            let userData = null;

            if (userSnap.exists()) {
                userData = userSnap.data();
            } else {
                userData = null;
            }

            currentUserState.user = user;
            currentUserState.data = userData;
            player.selectedSkin = userData.savedSelectedSkin || 0;
            player.selectedEffect = userData.savedSelectedEffect || 0;

            if (typeof currentUserState.unsubscribe === "function") {
                currentUserState.unsubscribe();
            }
            currentUserState.unsubscribe = listenToUserData(user.uid);

        } else {
            // user logged out
            if (typeof currentUserState.unsubscribe === "function") {
                currentUserState.unsubscribe();
            }
            currentUserState.user = null;
            currentUserState.data = null;
            console.log("Brak zalogowanego użytkownika");
        }
        updateUI();
    });
}
setupAuthListener();


function listenToUserData(userId) {
    const userRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            currentUserState.data = docSnap.data();
            console.log("Aktualne dane użytkownika:", currentUserState.user.displayName, currentUserState.data);
            updateUI();
        }
    });

    return unsubscribe;
}


export async function loginAndCreateProfile() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let userData;
        if (!userSnap.exists()) {
            userData = {
                username: user.displayName,
                highScore: 0,
                coins: 0,
                unlockedSkins: [0],
                unlockedEffects: [0],
                savedSelectedSkin: 0,
                savedSelectedEffect: 0,
                createdAt: new Date().toISOString()
            };
            await setDoc(userRef, userData);
        } else {
            userData = userSnap.data();
        }

        currentUserState.user = user;
        currentUserState.data = userData;
        player.selectedSkin = userData.savedSelectedSkin || 0;
        player.selectedEffect = userData.savedSelectedEffect || 0;

    } catch (error) {
        console.error("Błąd logowania:", error);
    }
}

export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Wylogowano");
        currentUserState.user = null;
        currentUserState.data = null;
        player.selectedSkin = 0;
        player.selectedEffect = 0;
        return true;
    } catch (error) {
        console.error("Błąd wylogowania", error);
        return false;
    }
}

export async function updateUserHighscore(newHighScore) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, { highScore: newHighScore });
            return true;
        }
        return false;
    } catch (error) {
        console.error("Błąd aktualizacji wyniku:", error);
        return false;
    }
}

export async function saveSelectedSkin(id) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, { savedSelectedSkin: id });
            return true;
        }
        return false;
    } catch (error) {
        console.error("Błąd aktualizacji skina", error);
        return false;
    }
}

export async function saveSelectedEffect(id) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, { saveSelectedEffect: id });
            return true;
        }
        return false;
    } catch (error) {
        console.error("Błąd aktualizacji efektu", error);
        return false;
    }
}

export async function getTop10Scores() {
    try {
        const q = query(
            collection(db, "users"),
            orderBy("highScore", "desc"),
            limit(10)
        );

        const snap = await getDocs(q);
        const top10 = snap.docs.map(d => {
            const data = d.data() || {};
            return {
                uid: d.id,
                username: data.username ?? "Unknown",
                highScore: Number(data.highScore ?? 0)
            };
        });

        return top10;
    } catch (err) {
        console.error("Błąd pobierania TOP10:", err);
        return [];
    }
}