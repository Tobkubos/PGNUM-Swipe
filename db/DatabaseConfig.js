import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    getFirestore, doc, getDoc, setDoc, updateDoc, query, collection, orderBy, limit, getDocs, onSnapshot, arrayUnion
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { updateUI } from "../scripts/sceneManager.js";
import { player } from "../main.js";
import { SKINS_BY_KEY } from "../scripts/skins.js";

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

function DB_setupAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            let userData;
            if (!userSnap.exists()) {
                userData = {
                    username: user.displayName,
                    highScore: 0,
                    coins: 0,
                    unlockedSkins: ["default"],
                    unlockedEffects: ["none"],
                    savedSelectedSkin: "default",
                    savedSelectedEffect: "none",
                    createdAt: new Date().toISOString()
                };
                await setDoc(userRef, userData);
            } else {
                userData = userSnap.data();
            }

            currentUserState.user = user;
            currentUserState.data = userData;
            player.selectedSkin = userData.savedSelectedSkin && SKINS_BY_KEY[userData.savedSelectedSkin] ? userData.savedSelectedSkin : "default";
            player.selectedEffect = userData.savedSelectedEffect || 0;

            if (typeof currentUserState.unsubscribe === "function") {
                currentUserState.unsubscribe();
            }
            currentUserState.unsubscribe = DB_listenToUserData(user.uid);

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
DB_setupAuthListener();

function DB_listenToUserData(userId) {
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

export async function DB_loginAndCreateProfile() {
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
                unlockedSkins: ["default"],
                unlockedEffects: ["none"],
                savedSelectedSkin: "default",
                savedSelectedEffect: "none",
                createdAt: new Date().toISOString()
            };
            await setDoc(userRef, userData);
        } else {
            userData = userSnap.data();
        }

        currentUserState.user = user;
        currentUserState.data = userData;
        player.selectedSkin = userData.savedSelectedSkin && SKINS_BY_KEY[userData.savedSelectedSkin] ? userData.savedSelectedSkin : "default";
        player.selectedEffect = userData.savedSelectedEffect || "none";

    } catch (error) {
        //console.error("Błąd logowania:", error);
    }
}

export async function DB_logoutUser() {
    try {
        await signOut(auth);
        console.log("Wylogowano");
        currentUserState.user = null;
        currentUserState.data = null;
        player.selectedSkin = "default";
        player.selectedEffect = "none";
        return true;
    } catch (error) {
        console.error("Błąd wylogowania", error);
        return false;
    }
}

export async function DB_updateUserHighscore(newHighScore) {
    if (currentUserState.data == null || newHighScore < currentUserState.data.highScore) return;

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

export async function DB_saveSelectedSkin(skinKey) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        if (!SKINS_BY_KEY[skinKey]) {
            console.warn("Nieznany skin:", skinKey);
            return false;
        }

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { savedSelectedSkin: skinKey });
        return true;
    } catch (e) {
        console.error("Błąd zapisu skina", e);
        return false;
    }
}

export async function DB_saveSelectedEffect(effectKey) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, { savedSelectedEffect: effectKey });
            return true;
        }
        return false;
    } catch (error) {
        console.error("Błąd aktualizacji efektu", error);
        return false;
    }
}

export async function DB_addNewSkinToCollection(skinKey) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        if (!SKINS_BY_KEY[skinKey]) return false;

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {unlockedSkins: arrayUnion(skinKey)
        });

        return true;
    } catch (e) {
        console.error("Błąd dodania skina", e);
        return false;
    }
}

export async function DB_addNewEffectToCollection(effectKey) {
    try {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, { unlockedEffects: arrayUnion(effectKey) });
            return true;
        }
        return false;
    } catch (error) {
        console.error("Błąd dodania efektu", error);
        return false;
    }
}


export async function DB_getTop10Scores() {
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