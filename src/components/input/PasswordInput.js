import React from "react";
import FormTextInput from "./FormTextInput";
import PropTypes from "prop-types";


const PasswordInput = ({ tagId, value, onChange, placeholder, label }) => (
    <FormTextInput
        type="password"
        tagId={tagId}
        className="form_text_input id_input"
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        wrapperClassName="input_password"
    />
);

PasswordInput.propTypes = {
    tagId: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
};

PasswordInput.defaultProps = {
    value: '',
    placeholder: '',
};

export default PasswordInput;