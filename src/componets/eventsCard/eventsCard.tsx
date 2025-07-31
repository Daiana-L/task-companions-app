"use client";
import { useEffect, useState } from "react";
import { getEvents } from "../../lib/fireStore";

export default function TaskCard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getEvents();
            setTasks(data);
        };
        fetchTasks();
    }, []);
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Tareas pendientes</h2>
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="border p-4 rounded shadow">
                            <h3 className="font-semibold text-lg">
                                {task.title}
                            </h3>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">
                                Fecha límite: {task.deadline}
                            </p>
                            <p>{task.status ? "Completada" : "Pendiente"}</p>
                        </li>
                    ))}
                </ul>
        </div>
    );
}
