import React from 'react';
import Button from "../../../components/button/Button";
import { useDispatch, useSelector } from 'react-redux';
import {
    setSignUpStep,
    setId, setDomain, resetAuthCode, setInputCheck,
    setButtonLabel, setStage, setApiCalled,
} from '../../../redux/actions/SignUpActions';
import PropTypes from 'prop-types';
import UserPassword from "../user/UserPassword";

const SignUpStepTwo = ({ handleButtonClick}) => {
    const dispatch = useDispatch();
    const { signUpStep } = useSelector(state => state.signUp);

    const handleSubmit = e => {
        e.preventDefault();
        handleButtonClick();
    };

    const handlePrevStep = () => {
        dispatch(setSignUpStep(signUpStep - 1));
        dispatch(setStage(1));
        dispatch(setId(''));
        dispatch(setDomain(''));
        dispatch(resetAuthCode());
        dispatch(setApiCalled(false));
        dispatch(setInputCheck(false));
        dispatch(setButtonLabel('Get Authentication'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <UserPassword/>
            <div className="btns_wrap">
                <Button type="submit" className="sign_btn" label="NEXT STEP" onClick={handleButtonClick} />
                <Button type="button" className="link_btn mt-8" label="Prev Step" onClick={handlePrevStep} />
            </div>
        </form>
    );
};

SignUpStepTwo.propTypes = {
    handleButtonClick: PropTypes.func.isRequired,
};

export default SignUpStepTwo;