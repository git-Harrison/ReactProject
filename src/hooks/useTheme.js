import { useEffect } from "react";
import { useCookie } from "../components/CookieComponent";

export const useTheme = () => {
    const [themeMode, setThemeMode] = useCookie("themeMode", "light");
    const [themeColor, setThemeColor] = useCookie("themeColor", "orange");
    const [navMode, setNavMode] = useCookie("navMode", "side");

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', themeMode);
        root.setAttribute('data-theme-color', themeColor);
        root.setAttribute('data-nav-mode', navMode);
    }, [themeMode, themeColor, navMode]);

    return { themeMode, setThemeMode, themeColor, setThemeColor, navMode, setNavMode };
};