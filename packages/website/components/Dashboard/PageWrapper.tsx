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
        <main className="flex flex-col gap-y-4">
            <header className="flex flex-col gap-y-3 md:gap-y-4">
                <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>

                <p className="max-w-prose text-sm text-primary-light md:max-w-prose-lg">
                    {introduction}
                </p>
            </header>

            <Divider className="mx-0 max-w-prose md:max-w-prose-lg" />

            {children}
        </main>
    );
}
