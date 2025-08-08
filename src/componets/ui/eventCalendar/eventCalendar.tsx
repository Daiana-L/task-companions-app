"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { localizer } from "../../../lib/CalendarConfig";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from "../../../lib/fireStore";


export default function TaskCalendar() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getEvents();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const events = tasks?.map((task) => ({
        title: task.title,
        start: new Date(task.deadline),
        end: new Date(task.deadline),
        status: task.status
    }));

    const eventStyle = (event) => {
        const backgroundColor = event.status ? "green" : "#3174ad"; 
        const style = {
            backgroundColor,
            borderRadius: "5px",
            opacity: 0.8,
            color: "white",
            border: "none",
            display: "block",
            padding: 8,
        };
        return {
            style,
        };
    };

    return (
        <div style={{ padding: "1rem", maxWidth: 900, margin: "auto" }}>
            <h2 className="text-center text-2xl font-bold mb-4">
                Calendario de tareas
            </h2>

            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 550 }}
                selectable={true}
                eventPropGetter={eventStyle} 
            />
        </div>
    );
}
