"use client";
import { useRef, useEffect } from "react";

export default function useAlert(
    hideFunction: () => void,
    hidingAnimationDelay: number,
    timerDelay: number
) {
    const alertRef = useRef<HTMLButtonElement>(null);

    const startHidingAnimation = () => {
        if (!alertRef.current) return hideFunction();

        alertRef.current.classList.add("opacity-0");
        setTimeout(hideFunction, hidingAnimationDelay);
    };

    useEffect(() => {
        const timeoutId = setTimeout(startHidingAnimation, timerDelay);

        return () => clearTimeout(timeoutId);
    }, []);

    return { alertRef, startHidingAnimation };
}
