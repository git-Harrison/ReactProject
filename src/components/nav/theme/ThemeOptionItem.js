import React from 'react';
import PropTypes from "prop-types";
import Checkbox from '../../input/Checkbox';

function ThemeOptionItem({ id, text, checked, onToggle }) {
    return (
        <div className="theme_option_item">
            <Checkbox
                type="checkbox"
                id={id}
                text={text}
                checked={checked}
                onToggle={onToggle}
            />
        </div>
    );
}

ThemeOptionItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default ThemeOptionItem;