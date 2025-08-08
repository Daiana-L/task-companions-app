"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function RegisterForm() {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { registerWithEmail } = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerWithEmail(email, password, displayName);
        toast.success("¡Registro exitoso!");
        setDisplayName("")
        setEmail("");
        setPassword("");
    };

    return (
        <div className="max-w-sm mx-auto  p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
                Registrar usuario
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <label>Username</label>
                <input
                    type="name"
                    placeholder="Username"
                    className="w-full border px-3 py-2"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
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
