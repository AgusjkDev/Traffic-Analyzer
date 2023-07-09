"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { devicesActionTabs } from "data";

export default function DevicesActionTabs() {
    const [tabWidth, setTabWidth] = useState(0);
    const tabRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname();

    const handleTabWidth = useCallback(() => {
        if (!tabRef.current) return;

        setTabWidth(tabRef.current.clientWidth);
    }, [tabRef.current, setTabWidth]);

    const tabIndex = devicesActionTabs.findIndex(({ href }) => href === pathname);

    useEffect(() => {
        if (!tabWidth) handleTabWidth();

        // When the window resizes, we need to update the tab width.
        window.addEventListener("resize", handleTabWidth);

        return () => window.removeEventListener("resize", handleTabWidth);
    }, []);

    return (
        <div className={"relative flex w-full flex-col"}>
            <div className="flex justify-around border-b-2 border-b-gray-200">
                {devicesActionTabs.map(({ href, title, children }, i) => (
                    <Link
                        key={href}
                        href={href}
                        title={title}
                        className="w-full py-3 text-center text-sm"
                        {...(i === 0 && { ref: tabRef })}
                    >
                        {children}
                    </Link>
                ))}
            </div>

            <div
                style={{
                    width: tabWidth,
                    ...(tabIndex > -1 && { transform: `translateX(${tabWidth * tabIndex}px)` }),
                }}
                className={twMerge(
                    "absolute bottom-0 h-[2px] bg-secondary transition",
                    tabIndex === -1 && "opacity-0"
                )}
            />
        </div>
    );
}
