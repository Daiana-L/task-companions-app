"use client";
import { useState } from "react";
import { addEvent } from "../../lib/fireStore";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEvent({ title, description, deadline });
        setTitle("");
        setDescription("");
        setDeadline("");
    };
    return (
        
        <div className="mt-20">
            <h1 className="flex justify-center">Crear una tarea</h1>
            <form onSubmit={handleSubmit} className="p-4 max-w-md">
            <label>Titulo</label>
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
            <label>Fecha limite</label>
            <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="block mb-2 w-full border px-2 py-1"
            />
            <button  type="submit" className="bg-orange-500 text-white px-4 py-2">
                Crear
            </button>
        </form>
        </div>
    );
}
