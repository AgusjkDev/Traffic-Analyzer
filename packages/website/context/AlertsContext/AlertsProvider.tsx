"use client";
import { useState, type PropsWithChildren } from "react";

import AlertsContext from "./AlertsContext";
import { Alert } from "components";
import { generateRandomId } from "helpers";
import type { AlertsState, AddAlert, Alert as IAlert } from "./types";

export default function AlertsProvider({ children }: PropsWithChildren) {
    const [alerts, setAlerts] = useState<AlertsState["alerts"]>([]);

    const addAlert: AddAlert = alert => {
        setAlerts(prevState => [...prevState, { id: generateRandomId(), ...alert }]);
    };

    const hideAlert = (alertId: IAlert["id"]) => {
        setAlerts(prevState => prevState.filter(({ id }) => alertId !== id));
    };

    return (
        <AlertsContext.Provider value={{ alerts, addAlert }}>
            <div className="fixed bottom-2 right-2 flex max-w-[min(300px,75vw)] flex-col-reverse items-end gap-y-3 md:bottom-auto md:top-[104.56px] md:flex-col">
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