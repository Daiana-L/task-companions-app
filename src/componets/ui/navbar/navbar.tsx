"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/assets/img/logo.png";
import { PiUser } from "react-icons/pi";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { routes } from "../../../routes";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
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
                    <Link
                        className="text-amber-50 ml-20 sm:hidden md:hidden lg:hidden"
                        href={routes.login}
                        onClick={() => setIsOpen(false)}
                    >
                        <PiUser size={30} />
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <IoMenuOutline size={36} />
                    </button>
                    <ul className="hidden md:flex gap-10 text-white font-medium items-center">
                        <li className="p-2 rounded-2xl hover:bg-orange-300 transition">
                            <Link href={routes.home}>Home</Link>
                        </li>
                        <li className="p-2 rounded-2xl hover:bg-orange-300 transition">
                            <Link href={routes.addTask}>Anadir una tarea</Link>
                        </li>
                        <li className="p-2 rounded-2xl hover:bg-orange-300 transition">
                            <Link href={routes.perfil}>Perfil</Link>
                        </li>
                        <li>
                            <Link href={routes.login}>
                                <PiUser size={30} />
                            </Link>
                        </li>
                    </ul>
                </div>
                {isOpen && (
                    <ul className="md:hidden flex flex-col gap-4 mt-4 text-white font-medium bg-orange-500/90 rounded-xl mb-4 p-4">
                        <li>
                            <Link
                                href={routes.home}
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={routes.addTask}
                                onClick={() => setIsOpen(false)}
                            >
                                Añadir una tarea
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={routes.perfil}
                                onClick={() => setIsOpen(false)}
                            >
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={routes.login}
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
}
