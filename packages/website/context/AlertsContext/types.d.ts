export interface Alert {
    id: string;
    success: boolean;
    message: string;
}

export interface AlertsState {}

type AddAlert = (alert: Omit<Alert, "id">) => void;

export interface AlertsContext extends AlertsState {
    addAlert: AddAlert;
}
