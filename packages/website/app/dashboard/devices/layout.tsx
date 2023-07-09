import { type PropsWithChildren } from "react";

import { PageWrapper, DevicesLayoutHeader, DevicesActionTabs } from "components/Dashboard";

export default function Devices({ children }: PropsWithChildren) {
    return (
        <PageWrapper
            title="Dispositivos"
            introduction="Activa, configura y monitorea tus dispositivos."
        >
            <div className="flex max-w-prose flex-col items-start gap-y-4 md:max-w-prose-lg">
                <DevicesLayoutHeader />

                <DevicesActionTabs />

                {children}
            </div>
        </PageWrapper>
    );
}
