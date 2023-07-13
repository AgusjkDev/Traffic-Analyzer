"use client";
import { twMerge } from "tailwind-merge";

import { Svg } from "components";
import { useAlert } from "hooks";
import { svgs } from "data";

interface AlertProps {
    success: boolean;
    children: React.ReactNode;
    hideAlert: () => void;
}

export default function Alert({ success, children, hideAlert }: AlertProps) {
    const { alertRef, startHidingAnimation } = useAlert({
        hideDelay: 500,
        timerDelay: 4700,
        hideFunction: hideAlert,
    });

    return (
        <button
            ref={alertRef}
            onClick={startHidingAnimation}
            className="group relative flex flex-wrap items-center justify-center gap-1 rounded-sm border-[1px] border-gray-300 bg-white p-2.5 transition duration-500 hover:border-gray-400 md:p-3"
        >
            <Svg
                {...(success ? svgs.checkCircle : svgs.checkX)}
                width={20}
                height={20}
                className={twMerge(
                    success
                        ? "fill-green-600 group-hover:fill-green-700"
                        : "fill-red-600 group-hover:fill-red-700"
                )}
            />

            <span className="text-xs text-primary-light transition-colors duration-300 [text-wrap:balance] group-hover:text-primary">
                {children}
            </span>

            <div
                className={twMerge(
                    "absolute bottom-0 -mt-[2px] h-[2px] w-full animate-timer rounded-b-sm transition-colors duration-300",
                    success
                        ? "bg-green-600 group-hover:bg-green-700"
                        : "bg-red-600 group-hover:bg-red-700"
                )}
            />
        </button>
    );
}
