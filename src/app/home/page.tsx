"use client";
import React, { useState } from "react";
import Hero from "../../componets/ui/hero/hero";
import TaskCard from "../../componets/eventsCard/eventsCard";
import TaskCalendar from "../../componets/ui/eventCalendar/eventCalendar";
import TaskForm from "../../componets/taskForm/taskForm"; 

export default function Home() {
    const [activeTab, setActiveTab] = useState<"add" | "calendar" | "tasks">("calendar");

    return (
        <div className="font-sans flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-5xl">
                <Hero />
            </div>
            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => setActiveTab("add")}
                    className={`px-4 py-2 rounded-full text-white transition ${
                        activeTab === "add" ? "bg-orange-500" : "bg-gray-500"
                    }`}
                >
                    Añadir Tarea
                </button>
                <button
                    onClick={() => setActiveTab("calendar")}
                    className={`px-4 py-2 rounded-full text-white transition ${
                        activeTab === "calendar" ? "bg-orange-500" : "bg-gray-500"
                    }`}
                >
                    Calendario
                </button>
                <button
                    onClick={() => setActiveTab("tasks")}
                    className={`px-4 py-2 rounded-full text-white transition ${
                        activeTab === "tasks" ? "bg-orange-500" : "bg-gray-500"
                    }`}
                >
                    Lista de Tareas
                </button>
            </div>
            <div className="w-full max-w-5xl mt-6">
                {activeTab === "add" && <TaskForm />}
                {activeTab === "calendar" && <TaskCalendar />}
                {activeTab === "tasks" && <TaskCard />}
            </div>
        </div>
    );
}
