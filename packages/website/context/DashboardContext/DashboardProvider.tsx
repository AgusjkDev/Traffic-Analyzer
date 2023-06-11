import type { PropsWithChildren } from "react";

import DashboardContext from "./DashboardContext";

export default function DashboardProvider({ children }: PropsWithChildren) {
    return <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>;
}
