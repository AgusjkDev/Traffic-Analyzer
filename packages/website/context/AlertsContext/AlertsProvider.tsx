"use client";
import { useState, type PropsWithChildren } from "react";

import AlertsContext from "./AlertsContext";
import { Alert } from "components";
import { generateRandomId } from "helpers";
import type { Alert as IAlert, AddAlert } from "./types";

export default function AlertsProvider({ children }: PropsWithChildren) {
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    const addAlert: AddAlert = alert => {
        setAlerts(prevState => [...prevState, { id: generateRandomId(), ...alert }]);
    };

    const hideAlert = (alertId: IAlert["id"]) => {
        setAlerts(prevState => prevState.filter(({ id }) => alertId !== id));
    };

    return (
        <AlertsContext.Provider value={{ addAlert }}>
            <div className="pointer-events-none fixed bottom-[calc(45px+8px)] right-2 z-[2] flex flex-col-reverse items-end gap-y-3 md:bottom-auto md:top-[calc(81px+8px)] md:flex-col">
                {alerts.map(({ id, success, message }) => (
                    <Alert key={id} success={success} hideAlert={() => hideAlert(id)}>
                        {message}
                    </Alert>
                ))}
            </div>

            {children}
        </AlertsContext.Provider>
    );
}
