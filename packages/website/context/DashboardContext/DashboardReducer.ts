import { Types, type DashboardState, type DashboardAction } from "./types";

export default function DashboardReducer(state: DashboardState, action: DashboardAction) {
    const { type, payload } = action;

    switch (type) {
        case Types.SET_STREETS:
            return {
                ...state,
                streets: payload,
            };
        default:
            return state;
    }
}
