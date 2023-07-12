"use client";
import { useState } from "react";

export default function useMenu() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleShowMenu = () => setShowMenu(prevState => !prevState);
    const hideMenu = () => setShowMenu(false);

    return { showMenu, toggleShowMenu, hideMenu };
}
