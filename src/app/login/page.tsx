"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../../firebase/firebaseConfig";
import Link from "next/link";
import { routes } from "../../routes";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("¡Sesión iniciada con email!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleAuth);
            alert("¡Sesión iniciada con Google!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
                Iniciar sesión
            </h2>
            <form onSubmit={handleEmailLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Iniciar sesión
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="mb-2 text-gray-600">O ingresa con Google</p>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Iniciar sesión con Google
                </button>
            </div>
            <div className="flex mt-2 text-center ml-15">
                <p>No tienes cuenta?</p><Link className="bg-amber-600 text-amber-50 ml-4 p-1 rounded-2xl " href={routes.register}>Registrate!</Link>
            </div>
        </div>
    );
}
