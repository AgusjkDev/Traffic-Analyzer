import Link from "next/link";
import { Card } from "@tremor/react";

import { dashboardCards } from "data";

export default function Cards() {
    return (
        <section className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-4 xl:gap-x-8 2xl:gap-x-12">
            {dashboardCards.map(({ title, paragraphs, anchor }) => (
                <Card className="flex max-w-prose flex-col gap-y-4 md:max-w-prose-lg lg:flex-1">
                    <h3 className="text-lg font-semibold">{title}</h3>

                    <div className="flex flex-col gap-y-2">
                        {paragraphs.map(paragraph => (
                            <p className="text-sm font-light text-primary-light">{paragraph}</p>
                        ))}
                    </div>

                    <Link
                        title={anchor.title}
                        href={anchor.href}
                        className="mt-2 text-center text-sm text-secondary transition-colors duration-300 hover:text-secondary-dark"
                    >
                        {anchor.children}
                    </Link>
                </Card>
            ))}
        </section>
    );
}
