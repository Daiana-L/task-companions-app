"use client";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleAuth } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const { setUser } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); //Cambia loading a false para indicar que ya terminaste de verificar si hay un usuario
        });

        return () => unsubscribe(); //limpieza del useEffect,evita que se llame setUser después de que el componente ya no existe
    }, [setUser]); //Guarda en la store el usuario actual o null

       // onAuthStateChanged es una función de Firebase que escucha en tiempo real si el usuario cambia de estado (login/logout).

        // auth = tu instancia de autenticación de Firebase

        // Callback (currentUser) => Firebase envia:
        // Un objeto de usario si hay sesión iniciada.
        // null si no hay usuario logueado.
        // unsubscribe es una función que devuelve onAuthStateChanged y que sirve para dejar de escuchar los cambios ya que esta funcion 
        // Se queda “escuchando” si el estado de autenticación cambia

    const loginWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleAuth);
    };

    const registerWithEmail = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return {
        loading,
        loginWithEmail,
        loginWithGoogle,
        registerWithEmail,
    };
};
