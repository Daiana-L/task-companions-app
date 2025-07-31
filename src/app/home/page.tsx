import React from "react";
import Hero from "../../componets/ui/hero/hero";
import TaskCard from "../../componets/eventsCard/eventsCard";

export default function Home() {
    return (
        <div className="font-sans flex flex-col justify-center"
        >
        <div>
            <Hero/>
        </div>
        <div>
            <TaskCard/>
        </div>

        </div>
    );
}
