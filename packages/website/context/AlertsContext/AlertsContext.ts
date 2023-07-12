"use client";
import { createContext } from "react";

import type { AlertsContext as IAlertsContext } from "./types";

const AlertsContext = createContext({} as IAlertsContext);

export default AlertsContext;
