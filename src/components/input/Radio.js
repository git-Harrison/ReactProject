import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
    const {className, id, type, name, checked, onChange} = props;

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        if (onChange) {
            onChange(isChecked);
        }
    };

    return (
        <>
            <li className={`radio_section ${className} `}>
                <label htmlFor={id} className="radio_button">
                    <input
                        type={type}
                        id={id}
                        className="radio_form"
                        name={name}
                        checked={checked}
                        onChange={handleChange}
                    />
                    <span className="custom_radio"></span>
                </label>
            </li>
        </>
    );
}

Radio.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Radio;