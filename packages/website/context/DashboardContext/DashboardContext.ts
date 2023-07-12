"use client";
import { createContext } from "react";

import type { DashboardContext as IDashboardContext } from "./types";

const DashboardContext = createContext({} as IDashboardContext);

export default DashboardContext;
