import React, {useEffect, useRef, useState, useCallback} from 'react';
import PropTypes from "prop-types";
import ThemeBranch from "./ThemeBranch";
import ThemeColorOptions from './ThemeColorOptions';
import ThemeOptionItem from './ThemeOptionItem';
import { useTheme } from '../../../hooks/useTheme';
import { setCookie } from '../../CookieComponent';


function ThemeSettings(props) {
    const { onClose } = props;

    // Hooks 정의
    const ref = useRef();
    const { themeMode, setThemeMode, themeColor, setThemeColor, navMode, setNavMode } = useTheme();
    const [isClosing, setIsClosing] = useState(false);

    // 핸들러 함수
    const handleClickOutside = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsClosing(true);
            setTimeout(onClose, 400);
        }
    }, [onClose]);

    const handleThemeColorChange = (color) => {
        setThemeColor(color);
        setCookie('themeColor', color, 7);
    };

    const handleThemeToggle = (isChecked) => {
        const newThemeMode = isChecked ? 'dark' : 'light';
        setThemeMode(newThemeMode);
    };

    // 부수 효과
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', themeMode);
        root.setAttribute('data-theme-color', themeColor);
        root.setAttribute('data-nav-mode', navMode);
        setCookie('themeMode', themeMode, 7);
        setCookie('themeColor', themeColor, 7);
        setCookie('navMode', navMode, 7);
    }, [themeMode, themeColor, navMode]);

    // 렌더링 로직
    const wrapClassName = isClosing ? 'theme_settings_wrap closing' : 'theme_settings_wrap';
    const className = isClosing ? 'theme_settings closing' : 'theme_settings';

    return (
        <div className={wrapClassName}>
            <div className={className} ref={ref}>
                <h1 className="theme_settings_title">Theme Settings</h1>
                <h4 className="settings_title">Theme Branch</h4>
                <ThemeBranch/>
                <h4 className="settings_title">Theme colors</h4>
                <ThemeColorOptions
                    themeColor={themeColor}
                    onThemeColorChange={handleThemeColorChange}
                />
                <h4 className="settings_title">Theme Options</h4>
                <ThemeOptionItem
                    id="checkbox"
                    text="Dark"
                    checked={themeMode === 'dark'}
                    onToggle={handleThemeToggle}
                />
            </div>
        </div>
    );
}

ThemeSettings.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default ThemeSettings;