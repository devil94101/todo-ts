import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type Props = {
    isComponentVisible:boolean;
    setIsComponentVisible: (data: boolean) => void 
}

export function useComponentVisible({isComponentVisible,setIsComponentVisible}: Props) {

    const ref = useRef<HTMLDivElement>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target)) {
            setIsComponentVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}
