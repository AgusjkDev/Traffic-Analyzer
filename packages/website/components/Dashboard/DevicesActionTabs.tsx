"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { useTabs } from "hooks";
import { devicesActionTabs } from "data";

export default function DevicesActionTabs() {
    const { tabRef, tabWidth } = useTabs();
    const pathname = usePathname();

    const tabIndex = devicesActionTabs.findIndex(({ href }) => href === pathname);

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
