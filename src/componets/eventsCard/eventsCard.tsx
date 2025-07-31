"use client";
import { useEffect, useState } from "react";
import { getEvents, deleteTask, toggleTaskStatus } from "../../lib/fireStore";

export default function TaskCard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getEvents();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const handleToggleStatus = async (id, currentStatus) => {
        await toggleTaskStatus(id, currentStatus);
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Tareas pendientes</h2>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="border p-4 rounded shadow">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <p>{task.description}</p>
                        <p className="text-sm text-gray-500">
                            Fecha límite:{" "}
                            {new Date(task.deadline).toLocaleString("es-AR")}
                        </p>

                        <p className="mb-2">
                            Estado:{" "}
                            <span
                                className={
                                    task.status
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {task.status ? "Completada" : "Pendiente"}
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    handleToggleStatus(task.id, task.status)
                                }
                                className="bg-green-600 text-white px-4 py-1 rounded"
                            >
                                {task.status ? "Desmarcar" : "Completada"}
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-4 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
