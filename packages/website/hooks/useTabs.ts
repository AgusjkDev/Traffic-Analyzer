"use client";
import { useState, useRef, useCallback, useEffect } from "react";

export default function useTabs() {
    const [tabWidth, setTabWidth] = useState(0);
    const tabRef = useRef<HTMLAnchorElement>(null);

    const handleTabWidth = useCallback(() => {
        if (!tabRef.current) return;

        setTabWidth(tabRef.current.clientWidth);
    }, [tabRef.current, setTabWidth]);

    useEffect(() => {
        if (!tabWidth) handleTabWidth();

        // When the window resizes, we need to update the tab width.
        window.addEventListener("resize", handleTabWidth);

        return () => window.removeEventListener("resize", handleTabWidth);
    }, []);

    return { tabRef, tabWidth };
}
