"use client";
import { useEffect, useState } from "react";
import {
    getEvents,
    deleteTask,
    toggleTaskStatus,
    updateTask,
} from "../../lib/fireStore";
import Swal from "sweetalert2";

export default function TaskCard() {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        deadline: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getEvents();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras recuperar esta tarea!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminala!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteTask(id);
                setTasks((prev) => prev.filter((task) => task.id !== id));

                Swal.fire({
                    title: "Eliminada!",
                    text: "Tu tarea ha sido eliminada.",
                    icon: "success",
                });
            }
        });
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        await toggleTaskStatus(id, currentStatus);
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
        if (newStatus) {
            Swal.fire({
                imageUrl: "/assets/img/gato-saltando.png",
                imageHeight: 300,
                imageAlt: "Tarea completada",
                title: "¡Buen trabajo!",
                text: "Has completado la tarea.",
                timer: 3000,
                showConfirmButton: true,
            });
        } else {
            Swal.fire({
                imageUrl: "/assets/img/gato-bostezo.png",
                imageHeight: 300,
                title: "Tarea marcada como pendiente",
                text: "Recuerda completarla más tarde.",
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditData({
            title: task.title,
            description: task.description,
            deadline: new Date(task.deadline).toISOString().slice(0, 16),
        });
    };

    const handleSaveEdit = async (id) => {
        await updateTask(id, {
            title: editData.title,
            description: editData.description,
            deadline: new Date(editData.deadline).toISOString(),
            
        });
            Swal.fire({
                        imageUrl: "/assets/img/gato-estirando.png",
                        imageHeight: 300,
                        imageAlt: "Tarea completada",
                        title: "¡Tarea guardada con exito!",
                        timer: 3000,
                        showConfirmButton: true,
                    });

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, ...editData } : task
            )
        );

        setEditingTaskId(null);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl text-center font-bold mb-4">
                Tareas pendientes
            </h2>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="border p-4 rounded-2xl shadow relative"
                    >
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full border p-2 mb-2 rounded-2xl"
                                />
                                <textarea
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border p-2 mb-2 rounded-2xl"
                                />
                                <input
                                    type="datetime-local"
                                    value={editData.deadline}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            deadline: e.target.value,
                                        })
                                    }
                                    className="w-full border p-2 mb-2 rounded-2xl"
                                />
                                <button
                                    onClick={() => handleSaveEdit(task.id)}
                                    className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setEditingTaskId(null)}
                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="font-semibold text-lg">
                                    {task.title}
                                </h3>
                                <p>{task.description}</p>
                                <p className="text-sm text-gray-500">
                                    Fecha límite:{" "}
                                    {new Date(task.deadline).toLocaleString(
                                        "es-AR"
                                    )}
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
                                        {task.status
                                            ? "Completada"
                                            : "Pendiente"}
                                    </span>
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() =>
                                            handleToggleStatus(
                                                task.id,
                                                task.status
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-1 rounded-2xl"
                                    >
                                        {task.status
                                            ? "Desmarcar"
                                            : "Completada"}
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(task)}
                                        className="bg-green-600 text-white px-4 py-1 rounded-2xl"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded-2xl"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
