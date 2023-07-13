"use client";
import { useRef, useEffect } from "react";

interface useAlertProps {
    hideDelay: number;
    timerDelay: number;
    hideFunction: () => void;
}

export default function useAlert({ hideDelay, timerDelay, hideFunction }: useAlertProps) {
    const alertRef = useRef<HTMLButtonElement>(null);

    const startHidingAnimation = () => {
        if (!alertRef.current) return hideFunction();

        alertRef.current.classList.add("opacity-0");
        setTimeout(hideFunction, hideDelay);
    };

    useEffect(() => {
        const timeoutId = setTimeout(startHidingAnimation, timerDelay);

        return () => clearTimeout(timeoutId);
    }, []);

    return { alertRef, startHidingAnimation };
}
