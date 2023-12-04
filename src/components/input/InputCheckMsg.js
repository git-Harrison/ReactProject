import React from 'react';
import PropTypes from 'prop-types';

const InputCheckMsg = (props) => {
    const {className, text} = props;

    return (
        <div className={className || 'sign_input_check_msg'}>
            {text}
        </div>
    );
};

InputCheckMsg.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
};

export default InputCheckMsg;