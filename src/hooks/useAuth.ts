"use client";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,signOut
} from "firebase/auth";
import { auth, googleAuth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export interface User {
    uid: string;
    email: string;
    createdAt: Date;
    updateAt: Date;
    lastLogin: Date;
    displayName: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const { setUser } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);                             
        });
        return () => unsubscribe(); 
    }, [setUser]);

    const loginWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleAuth);
    };

    const registerWithEmail = async (
        email: string,
        password: string,
        displayName: string
    ) => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = res.user;
            await updateProfile(user, {
                displayName: displayName,
            });
            await createUser({
                uid: user.uid,
                email: user.email,
                displayName,
                createdAt: new Date(),
            });
            return user;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw error;
        }
    };

    const createUser = async (user) => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            const userData = {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                displayName: user.displayName || null,
            };

            await setDoc(userRef, userData);
            console.log("usuario creado");
        } else {
            await setDoc(
                userRef,
                {
                    updatedAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                },
                {
                    merge: true,
                }
            );
            console.log("perfil actualizado");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            useAuthStore.getState().logout();
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return {
        loading,
        loginWithEmail,
        loginWithGoogle,
        registerWithEmail,
        createUser,
        handleLogout,
    };
};
