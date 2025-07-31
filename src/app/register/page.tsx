"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Usuario registrado correctamente");
            setEmail("");
            setPassword("");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
                Registrar usuario
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}
