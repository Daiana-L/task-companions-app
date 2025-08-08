"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/assets/img/logo.png";
import { PiUser } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { routes } from "../../../routes";
import Modal from "../modal/modal";
import LoginForm from "../../loginForm/loginForm";
import RegisterForm from "../../registerForm/registerForm";
import { useAuthStore } from "../../../store/authStore";
import { SlLogin, SlLogout } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import Profile from "../../userProfile/useProfile";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [profileModalOpen, setIsProfileModalOpen] = useState(false);

    const { isAuth, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            logout();
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-orange-500/65 backdrop-blur-md shadow z-50 mt-2 px-4">
                <div className="flex justify-between items-center lg:ml-28">
                    <div className="relative w-30 h-30 lg:w-40 lg:h-42">
                        <Link href={routes.home}>
                            <Image
                                src={logo}
                                alt="logo"
                                fill
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Botón de usuario / logout para móviles */}
                    <button
                        className="text-amber-50 ml-20 sm:hidden md:hidden lg:hidden"
                        onClick={() =>
                            isAuth ? handleLogout() : setIsLoginModalOpen(true)
                        }
                    >
                        {isAuth ? <FiLogOut size={30} /> : <PiUser size={30} />}
                    </button>

                    {/* Menú hamburguesa para móviles */}
                    <button
                        className="md:hidden text-white flex"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <IoMenuOutline size={36} />
                    </button>

                    {/* Menú para escritorio */}
                    <ul className="hidden md:flex gap-10 text-white font-medium items-center">
                        <li className="p-2 rounded-2xl hover:bg-orange-300 transition">
                            <Link href={routes.home}>
                                <GoHome size={30} className="inline mr-2" />
                                Home
                            </Link>
                        </li>
                        {isAuth && (
                            <li>
                                <button
                                    onClick={() => setIsProfileModalOpen(true)}
                                >
                                    <PiUser size={30} className="inline mr-2" />
                                    Mi perfil
                                </button>
                            </li>
                        )}

                        <li>
                            {isAuth ? (
                                <button
                                    className="flex mr-4"
                                    onClick={handleLogout}
                                >
                                    <SlLogout className="mr-3" size={30} />
                                    Cerrar sesión
                                </button>
                            ) : (
                                <button
                                    className="flex mr-4"
                                    onClick={() => setIsLoginModalOpen(true)}
                                >
                                    <SlLogin className="mr-3" size={30} />
                                    Iniciar sesión
                                </button>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Menú móvil desplegable */}
                {isOpen && (
                    <ul className="md:hidden flex flex-col gap-4 mt-4 text-white font-medium bg-orange-500/90 rounded-xl mb-4 p-4">
                        <li>
                            <Link
                                href={routes.home}
                                onClick={() => setIsOpen(false)}
                            >
                                <GoHome size={30} className="inline mr-2" />
                                Home
                            </Link>
                        </li>
                        {isAuth && (
                            <li>
                                <Link
                                    href={routes.perfil}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <PiUser size={30} className="inline mr-2" />
                                    Mi Perfil
                                </Link>
                            </li>
                        )}
                    </ul>
                )}
            </nav>

            {/* Modales de login y registro */}
            <Modal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                title="Iniciar sesión"
            >
                <LoginForm
                    onRegisterClick={() => {
                        setIsLoginModalOpen(false);
                        setIsRegisterModalOpen(true);
                    }}
                    onSuccess={() => {
                        setIsLoginModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                title="Registrarse"
            >
                <RegisterForm />
            </Modal>

            {/* Modal de perfil */}
            <Modal
                isOpen={profileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                title="Perfil"
            >
                <Profile />
            </Modal>
        </>
    );
}
