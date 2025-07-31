import React from "react";
import Hero from "../../componets/ui/hero/hero";
import TaskCard from "../../componets/eventsCard/eventsCard";
import TaskCalendar from "../../componets/ui/eventCalendar/eventCalendar";

export default function Home() {
    return (
        <div className="font-sans flex flex-col justify-center"
        >
        <div>
            <Hero/>
        </div>
        <div>
            <TaskCalendar/>
        </div>
        <div>
            <TaskCard/>
        </div>
        </div>
    );
}
