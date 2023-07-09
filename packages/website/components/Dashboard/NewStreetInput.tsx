"use client";
import { useState } from "react";

import { Svg } from "components";
import { svgs } from "data";
import type { CreateStreet } from "context/DashboardContext";

interface NewStreetInputProps {
    createStreet: CreateStreet;
}

export default function NewStreetInput({ createStreet }: NewStreetInputProps) {
    const [newStreetName, setNewStreetName] = useState("");

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                createStreet(newStreetName.trim());
                setNewStreetName("");
            }}
            className="relative"
        >
            <input
                required
                type="text"
                placeholder="Nueva calle"
                value={newStreetName}
                onChange={e => setNewStreetName(e.target.value)}
                className="w-full rounded-md border-[1px] border-gray-300 bg-white p-2.5 pr-8 text-sm placeholder:text-primary-light focus:border-gray-400 focus:outline-none"
            />
            <button
                className={`absolute right-0 h-full pr-1.5 ${newStreetName.trim() ? "" : "hidden"}`}
            >
                <Svg {...svgs.check} width={22} height={22} className="fill-primary-light" />
            </button>
        </form>
    );
}
