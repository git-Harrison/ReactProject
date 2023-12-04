import React from 'react';
import PropTypes from 'prop-types';

function FormSearchInput(props) {
    return (
        <div className={`search_form ${props.wrapClassName}`}>
            <input type={props.type} id={props.id} name={props.name} className={props.className} placeholder={props.placeholder} autoComplete="off" onChange={props.onChange} value={props.value} onKeyPress={props.onKeyPress}/>
            <label htmlFor={props.id} className="form_search_label">{props.label}</label>
        </div>
    );
}

FormSearchInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    wrapClassName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onKeyPress: PropTypes.func,
};

export default FormSearchInput;