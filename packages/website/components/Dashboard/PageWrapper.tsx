import { Divider } from "@tremor/react";
import type { PropsWithChildren } from "react";

interface PageWrapperProps {
    title: React.ReactNode;
    introduction: React.ReactNode;
}

export default function PageWrapper({
    title,
    introduction,
    children,
}: PropsWithChildren<PageWrapperProps>) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-lg text-primary md:text-2xl">{title}</h2>
                <p className="max-w-prose text-sm text-primary-light md:max-w-prose-lg md:text-base">
                    {introduction}
                </p>
            </div>

            <Divider />

            {children}
        </div>
    );
}
