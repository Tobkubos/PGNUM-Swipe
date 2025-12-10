
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    getFirestore, doc, getDoc, setDoc, updateDoc, query, collection, orderBy, limit, getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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


function handleUserLogin(user) {
    const statusDiv = document.getElementById("user-status");
    const loginBtn = document.querySelector(".login-btn");
    
    if (statusDiv && loginBtn) {
        statusDiv.innerText = `Logged as: ${user.displayName}`;
        loginBtn.style.display = "none";
    }

    //download user highscore
    getUserHighscore().then(score => {
        const scoreEl = document.querySelector(".menu-info-highscore");
        if(scoreEl) scoreEl.innerText = score;
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Wykryto sesję użytkownika:", user.displayName);
        handleUserLogin(user);
    } else {
        console.log("Brak zalogowanego użytkownika.");
    }
});

export async function loginAndCreateProfile() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        //check if user profile exists
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const newUserData = {
                username: user.displayName,
                email: user.email,
                highScore: 0,
                coins: 0,            
                unlockedSkins: [0],   
                unlockedEffects: [0],
                createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newUserData);
        }
        
        return { user: user };
    } catch (error) {
        console.error("Błąd logowania:", error);
        return null;
    }
}
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Wylogowano");
        return true;
    } catch (error) {
        console.error("Błąd wylogowania", error);
        return false;
    }
}

export async function getUserHighscore() {
    try {
        const user = auth.currentUser;
        if (!user) return 0; //if not logged in, return 0
        
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return Number(userSnap.data().highScore ?? 0);
        }
        return 0;
    } catch (error) {
        console.error("Błąd pobierania wyniku:", error);
        return 0;
    }
}

export async function updateUserHighscore(newHighScore) {
    try {
        const user = auth.currentUser;
        if (!user) return false;
        
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const currentScore = userSnap.data().highScore || 0;
            
            if (newHighScore > currentScore) {
                await updateDoc(userRef, { highScore: newHighScore });
                console.log("Nowy rekord zapisany:", newHighScore);
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Błąd aktualizacji wyniku:", error);
        return false;
    }
}

export async function updateTop10ScoreDisplay() {
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