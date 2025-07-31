import { FaInstagram } from "react-icons/fa";
import logo from "../../../../public/assets/img/logo.png";
import Image from "next/image";
const Footer = () => {
    return (
        <footer className="w-full bg-orange-500/65 backdrop-blur-md text-white lg:py-8 ">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between  items-center lg:gap-5 xs:gap-2">
                <div className="flex lg:w-[150] xs:w-[100] xs:mt-3">
                    <Image src={logo} width={100} alt="logo" />
                </div>
                <div className="flex justify-center lg:flex-row gap-4 text-sm lg:ml-20 xs:mb-2">
                    <a href="/Home" className="hover:underline">
                        Inicio
                    </a>
                    <a href="/contacto" className="hover:underline">
                        Contacto
                    </a>
                    <a href="/ayuda" className="hover:underline">
                        Ayuda
                    </a>
                </div>
                <div className="text-l flex flex-col md:flex-row gap-4 items-center">
                    <a
                        href=""
                        aria-label="Instagram"
                        className="hover:text-pink-400 flex items-center gap-2"
                    >
                        <FaInstagram className="text-xl" />
                        <span>Síguenos en Instagram!</span>
                    </a>
                </div>
            </div>
            <div className="mt-2 mb-3 flex justify-center text-center text-sm text-gray-400">
                © 2025 TaskCompanions. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
