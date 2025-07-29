import Image from "next/image";
import React from "react";
import logo from "../../../../public/assets/img/logo.png";
import { PiUser } from "react-icons/pi";
import Link from "next/link";
import { routes } from "../../../routes";

export default function Navbar() {
    return (
        <div className="">
            <nav className="fixed flex justify-around space-x-20 top-0  w-full bg-orange-500/65  backdrop-blur-md shadow z-50 mt-2">
                <div className="flex items-center justify-between px-5 ">
                    <Link href={routes.home}>
                        <Image src={logo} width={230} alt="logo" />
                    </Link>
                </div>
                <ul className="flex gap-10 text-white font-medium items-center ">
                    <li className="p-2 rounded-2xl hover:bg-orange-400 transition">
                        <Link href={routes.home}>Home</Link>
                    </li>
                    <li className="p-2 rounded-2xl hover:bg-orange-400 transition">
                        Anadir una tarea
                    </li>
                    <li className="p-2 rounded-2xl hover:bg-orange-400 transition">
                        <Link href={routes.perfil}>Perfil</Link>
                    </li>
                    <li>
                        <Link href={routes.login}>
                            <PiUser size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
