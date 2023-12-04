import React from 'react';
import PropTypes from "prop-types";
import Radio from '../../input/Radio';

function ThemeColorOptions({ themeColor, onThemeColorChange }) {
    const colors = ['orange', 'blue', 'purple', 'red', 'navy', 'green'];
    return (
        <div className="radio-buttons">
            <ul className="radio_button_box">
                {colors.map(color => (
                    <Radio
                        key={color}
                        type="radio"
                        className={themeColor === color ? `${color} checked` : color}
                        name="theme_color"
                        checked={themeColor === color}
                        onChange={() => onThemeColorChange(color)}
                        value={color}
                    />
                ))}
            </ul>
        </div>
    );
}

ThemeColorOptions.propTypes = {
    themeColor: PropTypes.string.isRequired,
    onThemeColorChange: PropTypes.func.isRequired
};

export default ThemeColorOptions;