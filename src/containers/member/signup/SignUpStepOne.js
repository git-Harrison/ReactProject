import React from 'react';
import Button from "../../../components/button/Button";
import SignEmailForm from "../../../components/member/sign/SignEmailForm";
import FormTextInput from "../../../components/input/FormTextInput";
import InputCheckMsg from "../../../components/input/InputCheckMsg";
import {useDispatch, useSelector} from 'react-redux';
import {setAuthCode} from '../../../redux/actions/SignUpActions';
import PropTypes from 'prop-types';

const SignUpStepOne = ({handleButtonClick}) => {
    const dispatch = useDispatch();

    const {
        id, domain, inputCheck, authCode, authError,
        formError, formErrorMsg, buttonLabel
    } = useSelector(state => state.signUp);

    const renderAuthCodeInput = () => (
        <div className="authentication_wrap">
            <FormTextInput
                type="text"
                tagId="authCode"
                wrapperClassName="re_request"
                className="form_text_input id_input"
                placeholder="Authentication code"
                label="Authentication code"
                value={authCode}
                onChange={e => dispatch(setAuthCode(e.target.value))}
                maxLength={10}
                reRequest={handleButtonClick}
            />
            {authError && <InputCheckMsg text={authError}/>}
        </div>
    );

    return (
        <>
            <SignEmailForm
                id={id}
                domain={domain}
            />
            {formError && <InputCheckMsg text={formErrorMsg}/>}
            {inputCheck && renderAuthCodeInput()}
            <div className="btns_wrap">
                <Button
                    type="submit"
                    className="sign_btn"
                    label={buttonLabel}
                    onClick={handleButtonClick}
                />
            </div>
        </>
    );
};

SignUpStepOne.propTypes = {
    handleButtonClick: PropTypes.func.isRequired,
};

SignUpStepOne.defaultProps = {
    handleButtonClick: () => {},
};

export default SignUpStepOne;