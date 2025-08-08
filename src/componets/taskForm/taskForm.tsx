"use client";
import { useState, useEffect } from "react";
import { addEvent, getUsers } from "../../lib/fireStore";
import Swal from "sweetalert2";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        async function fetchUsers() {
            const usersFromDB = await getUsers();
            setUsers(usersFromDB);
            console.log("Usuarios cargados:", usersFromDB);
            if (usersFromDB.length > 0) {
                setAssignedTo(usersFromDB[0].id); 
            }
        }
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEvent({ title, description, deadline, assignedTo });
        Swal.fire({
            imageUrl: "/assets/img/gatoList.png",
            imageHeight: 300,
            imageAlt: "Tarea completada",
            title: "¡Tarea creada con éxito!",
            timer: 3000,
            showConfirmButton: true,
        });
        setTitle("");
        setDescription("");
        setDeadline("");
        setAssignedTo(users.length > 0 ? users[0].id : "");
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl text-center font-bold mb-4">
                Añadir una nueva tarea
            </h2>
            <form onSubmit={handleSubmit} className="p-4 max-w-md ml-20">
                <label>Título</label>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block mb-2 w-full border px-2 py-1"
                />
                <label>Descripción</label>
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block mb-2 w-full border px-2 py-1"
                />
                <label>Fecha límite</label>
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="block mb-2 w-full border px-2 py-1"
                />
                <label>Asignar a</label>
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="block mb-4 w-full border px-2 py-1 text-black"
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.displayName}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2"
                >
                    Crear
                </button>
            </form>
        </div>
    );
}
