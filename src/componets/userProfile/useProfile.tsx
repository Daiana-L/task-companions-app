import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserData } from "../../lib/fireStore";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUserData();
            setUser(data);
        };
        fetchUsers();
        
    }, []);

    return (
        <section
            className="flex justify-center items-center xs:mt-20 lg:mt-28 bg-gray-100 rounded-3xl"
            data-aos="fade-down"
        >
            <div className="bg-white p-8 rounded-3xl shadow-xl relative lg:w-[160vh]">
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                    <div className="lg:w-32 lg:h-32 xs:w-24 xs:h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-indigo-100">
                        <Image
                            src="/assets/img/gato-sentadow.png"
                            alt="Avatar de usuario"
                            width={228}
                            height={128}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="lg:mt-10 text-center">
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">
                        Mi perfil
                    </h1>
                    <p className="text-gray-500 lg:mb-6">
                        Bienvenido/a a tu cuenta de TaskCompanions!
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-6 text-gray-700">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Username:
                        </label>
                        <p className="mt-1 font-semibold">{user?.displayName}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Email:
                        </label>
                        <p className="mt-1 font-semibold">{user?.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500">
                            Fecha de creación:
                        </label>
                        <p className="mt-1 font-semibold">
                            {user?.createdAt
                                ?.toDate?.()
                                .toLocaleDateString("es-AR")}
                        </p>
                    </div>

                    <div>
                        <button className="bg-orange-600 text-white px-4 py-1 rounded-2xl">
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
