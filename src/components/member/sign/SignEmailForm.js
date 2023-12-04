import React from 'react';
import PropTypes from 'prop-types';
import {setId, setDomain} from '../../../redux/actions/SignUpActions';
import FormTextInput from "../../input/FormTextInput";
import Select from "../../select/BasicSelect";
import InputCheckMsg from "../../input/InputCheckMsg";
import {useDispatch, useSelector} from "react-redux";

function SignEmailForm() {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.signUp);

    const domainOptions = [
        {key: "siliconii.net", value: "siliconii.net"},
        {key: "stylekoreanus.com", value: 'stylekoreanus.com'},
    ];

    const handleDomainChange = (value) => {
        dispatch(setDomain(value));
    };

    const handleIdChange = (e) => {
        dispatch(setId(e.target.value));
    };

    return (
        <>
            <div className="email_form">
                <FormTextInput
                    type="text"
                    tagId="signup_email"
                    name="signup_email"
                    className="form_text_input id_input"
                    placeholder="Enter Id"
                    label="ID"
                    value={id}
                    onChange={handleIdChange}
                />
                <span className="domain_icon">@</span>
                <Select
                    className="domain_select_box"
                    option={domainOptions}
                    title="domain"
                    onSelectChange={(key, value) => handleDomainChange(value)}
                />
            </div>
        </>
    )
}

SignEmailForm.propTypes = {
    id: PropTypes.string,
    setId: PropTypes.func,
    domain: PropTypes.string,
    setDomain: PropTypes.func,
};

export default SignEmailForm;