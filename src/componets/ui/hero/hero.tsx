import Image from "next/image";
import hero from "../../../../public/assets/img/imagen-gatoHome.png";
import Link from "next/link";
import { routes } from "../../../routes";

export default function Hero() {
    return (
        <div className="flex items-center gap-6 p-16">
            <div>
                <Image src={hero} width={290} alt="gatito"/>
            </div>
            <div className="max-w-md">
                <h1 className=" text-4xl font-bold mb-4">
                    Bienvenidos a TaskCompanions!
                </h1>
                <p className="text-lg leading-relaxed ">
                    Con <span className="font-bold">TaskCompanions</span> podés guardar todas tus tareas pendientes de
                    manera simple, divertida y en compañía. Cada vez que completes una tarea,
                    estarás dando un paso más hacia mejores hábitos y una vida
                    más organizada. ¡Porque cada pasito cuenta!
                </p>
                <button className="bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 transition duration-300 ml-26 mt-4">
                    <Link href={routes.login}> Empezemos!</Link>
                </button>
            </div>
        </div>
    );
}

