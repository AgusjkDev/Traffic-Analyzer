"use client";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { Svg } from "components";
import { svgs } from "data";
import type { Street } from "types/schemas";
import type { UpdateStreet, RemoveStreet } from "context/DashboardContext";

interface StreetInputProps {
    street: Street;
    updateStreet: UpdateStreet;
    removeStreet: RemoveStreet;
}

export default function StreetInput({ street, updateStreet, removeStreet }: StreetInputProps) {
    const [newStreetName, setNewStreetName] = useState(street.name);
    const [isDisabled, setIsDisabled] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const trimmedNewStreetName = newStreetName.trim();
        if (trimmedNewStreetName && trimmedNewStreetName !== street.name) {
            updateStreet(street.id, trimmedNewStreetName);
        }
        setIsDisabled(true);
    };

    const handleUpdate = () => {
        if (!inputRef.current) return;

        if (!isDisabled) return handleSubmit();

        setIsDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 1);
    };

    const handleDelete = () => {
        if (!confirm("¿Realmente deseas eliminar esta calle?")) return;

        removeStreet(street.id);
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}
            className="relative h-full [&>div]:hover:opacity-100"
        >
            <input
                required
                ref={inputRef}
                disabled={isDisabled}
                placeholder={newStreetName}
                value={newStreetName}
                onChange={e => setNewStreetName(e.target.value)}
                type="text"
                className="w-full rounded-md border-[1px] border-gray-200 bg-white p-2.5 text-sm font-light placeholder:text-primary-light focus:border-gray-300 focus:outline-none disabled:text-primary-light"
            />

            <div
                className={twMerge(
                    "absolute right-0 top-0 flex h-full gap-1 pr-1.5 transition-opacity",
                    isDisabled && "opacity-0"
                )}
            >
                <button type="button" onClick={handleUpdate}>
                    <Svg {...svgs.edit} width={22} height={22} className="fill-primary-light" />
                </button>

                <button type="button" onClick={handleDelete}>
                    <Svg {...svgs.trash} width={22} height={22} className="fill-primary-light" />
                </button>
            </div>
        </form>
    );
}
