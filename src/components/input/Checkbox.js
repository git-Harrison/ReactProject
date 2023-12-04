import React from 'react';
import PropTypes from 'prop-types';

function Checkbox(props) {
    const {type, id, text, checked, onToggle} = props;

    const handleToggle = () => {
        onToggle(!checked); // checked 값 반전
        if (text === 'Dark') {
            if (checked) {
                onToggle(false); // checked 해제 시 false 전달
            } else {
                onToggle(true); //  checked 인 경우 true 전달
            }
        }
    };

    return (
        <label className="checkbox_box" htmlFor={id}>
            <div className="container">
                <div className="round">
                    <input
                        type={type}
                        id={id}
                        className="checkbox_form"
                        checked={checked}
                        onChange={handleToggle}
                    />
                    <label htmlFor={id} className="checkbox_label">
                        <span className="checkbox_text">{text}</span>
                    </label>
                </div>
            </div>
        </label>
    );
}

Checkbox.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    checked: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Checkbox;