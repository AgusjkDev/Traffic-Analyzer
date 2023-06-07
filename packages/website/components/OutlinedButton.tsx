"use client";
import type { PropsWithChildren } from "react";

interface OutlinedButtonProps {
    onClick: () => void;
    className?: string;
}

export default function OutlinedButton({
    onClick,
    className,
    children,
}: PropsWithChildren<OutlinedButtonProps>) {
    return (
        <button
            onClick={onClick}
            className={`rounded-sm border-[1px] border-primary bg-white py-2.5 text-sm transition-colors duration-300 hover:border-secondary hover:text-secondary lg:text-base${
                className ? ` ${className}` : ""
            }`}
        >
            {children}
        </button>
    );
}
