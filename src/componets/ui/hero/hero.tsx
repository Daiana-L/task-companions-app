import Image from "next/image";
import hero from "../../../../public/assets/img/imagen-gatoHome.png";
import Link from "next/link";
import { routes } from "../../../routes";

export default function Hero() {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:gap-6 lg:p-6 text-center lg:text-left  p-6">
            <div className="relative w-40 h-40 lg:w-62 lg:h-62">
                <Image
                    src={hero}
                    alt="gatito"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="max-w-md flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Bienvenidos a TaskCompanions!
                </h1>
                <p className="text-left lg:text-lg leading-relaxed max-w-sm lg:max-w-lg">
                    Con <span className="font-bold">TaskCompanions</span> podés guardar todas tus tareas pendientes de
                    manera simple, divertida y en compañía. Cada vez que completes una tarea,
                    estarás dando un paso más hacia mejores hábitos y una vida
                    más organizada. ¡Porque cada pasito cuenta!
                </p>
                <button className="bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 transition duration-300 mt-4">
                    <Link href={routes.login}>Empecemos!</Link>
                </button>
            </div>
        </div>
    );
}
