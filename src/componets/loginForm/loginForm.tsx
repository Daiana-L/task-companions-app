"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Props = {
    onRegisterClick: () => void;
    onSuccess?: () => void;
};

export default function LoginForm({ onRegisterClick, onSuccess }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { loginWithEmail, loginWithGoogle } = useAuth();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginWithEmail(email, password);
            if (onSuccess) {
                onSuccess();
                Swal.fire({
                    imageUrl: "/assets/img/gato-sentado.png",
                    imageHeight: 300,
                    imageAlt: "imagen de login",
                    title: "¡Inicio de sesion exitoso!",
                    text: "Bienvenid@.",
                    timer: 3000,
                    showConfirmButton: true,
                });
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || "Error al iniciar sesión");
            } else {
                toast.error("Error desconocido al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            if (onSuccess) onSuccess();
            toast.success("¡Login exitoso!");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || "Error al iniciar sesión");
            } else {
                toast.error("Error desconocido al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 border rounded shadow">
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
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="mb-2 text-gray-600">O ingresa con Google</p>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Iniciando..." : "Iniciar sesión con Google"}
                </button>
            </div>

            <div className="flex mt-4 justify-center items-center gap-2">
                <p>No tienes cuenta?</p>
                <button
                    onClick={onRegisterClick}
                    className="bg-orange-500 text-amber-50 px-3 py-1 rounded-2xl"
                >
                    ¡Registrate!
                </button>
            </div>
        </div>
    );
}
