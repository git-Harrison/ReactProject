import React, {useEffect} from 'react';
import { useLocation   } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {
    setSignUpStep, setStage, resetSignUpStep, setFormError, setAuthError,
    setPasswordError, setFormErrorMsg, setApiCalled, setInputCheck,
    setButtonLabel, setCodeTimer, setTimerState, resetSignUp
} from '../../../redux/actions/SignUpActions';
import SignTitle from "../../../components/member/sign/SignTitle";
import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";
import SignUpStepThree from "./SignUpStepThree";
import SignUpStepFour from "./SignUpStepFour";
import {Register} from "../../../services/SignService";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        signUpStep, stage, id, domain, passWord, rePassWord,
        apiCalled, authCode, buttonLabel, timerState, codeTimer
    } = useSelector(state => state.signUp);

    useEffect(() => {
        let intervalId;

        if (timerState && codeTimer > 0) {
            intervalId = setInterval(() => {
                dispatch(setCodeTimer(codeTimer - 1));
            }, 1000);
        }

        if (codeTimer === 0 || !timerState) {
            clearInterval(intervalId);
            dispatch(setTimerState(false));
        }

        return () => clearInterval(intervalId);
    }, [timerState, codeTimer, dispatch]);

    useEffect(() => {
        dispatch(resetSignUp());
    }, [location, dispatch]);

    const fetchData = async () => {
        try {
            dispatch(setTimerState(true));

            const responseData = await Register(signUpStep, stage, id, domain, authCode);

            if (responseData.status === 400) {
                const errorText = responseData;
                const resultErrorText = errorText.substring(1, errorText.length - 1);
                throw new Error(resultErrorText);
            }

            handleResponse(responseData, stage);
        } catch (error) {
            console.error('API 에러 :', error);
            dispatch(setApiCalled(false));
            dispatch(setInputCheck(false));
            dispatch(setFormError(true));
            dispatch(setFormErrorMsg('*' + error.message));
        }
    };

    // stage 에 따른 함수 호출
    const handleResponse = (responseData, stage) => {
        if (stage === 1) {
            responseData ? handleStageOneSuccess() : handleStageOneFailure();
        }
        if (stage === 2) {
            responseData ? handleStageTwoSuccess() : handleStageTwoFailure();
        }
    };

    // stage 1 성공
    const handleStageOneSuccess = () => {
        dispatch(setButtonLabel('NEXT STEP'));
        dispatch(setStage(2));
        dispatch(setInputCheck(true));
        dispatch(setFormError(false));
        dispatch(setFormErrorMsg(''));
    };

    // stage 1 실패
    const handleStageOneFailure = () => {
        dispatch(setInputCheck(false));
        dispatch(setFormError(true));
        dispatch(setFormErrorMsg('* Please check your ID or email'));
    };

    // stage 2 성공
    const handleStageTwoSuccess = () => {
        dispatch(setApiCalled(true));
        dispatch(setSignUpStep(signUpStep + 1));
        dispatch(setAuthError(''));
    };

    // stage 2 실패
    const handleStageTwoFailure = () => {
        dispatch(setApiCalled(false));
        dispatch(setInputCheck(true));
    };

    // 스탭 초기화
    useEffect(() => {
        return () => dispatch(resetSignUpStep());
    }, [dispatch]);


    const handleButtonClick = () => {
        if (buttonLabel === 'Get Authentication') {
            if (!id || !domain) {
                dispatch(setFormError(true));
                dispatch(setFormErrorMsg('* Please check your ID or email'));
            } else {
                fetchData(stage);
            }
        } else if (buttonLabel === 'NEXT STEP') {
            handleNextStep();
        }
    };

    // 다음 스탭으로 넘어가기
    const handleNextStep = () => {
        if (signUpStep === 1) {
            if (!authCode || !apiCalled) {
                dispatch(setAuthError('* Please check the authentication code'));
            }
            fetchData(stage);
        } else if (signUpStep === 2) {
            handlePasswordValidation();
        }
    };

    // 패스워드 검사
    const handlePasswordValidation = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{10,})$/;
        if (!passWord || !rePassWord) {
            dispatch(setPasswordError('* Password fields cannot be empty'));
        } else if (!passwordRegex.test(passWord)) {
            dispatch(setPasswordError('* Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 10 characters long'));
        } else if (passWord !== rePassWord) {
            dispatch(setPasswordError('* Passwords do not match'));
        } else {
            dispatch(setSignUpStep(signUpStep + 1));
            dispatch(setPasswordError(''));
        }
    };

    // 스탭별 타이틀 문구
    const getMainText = (currentStep) => {
        switch (currentStep) {
            case 1:
                return 'Email Authentication';
            case 2:
                return 'Create Your Password';
            case 3:
                return 'Enter company information';
            case 4:
                return 'Signup complete';
            default:
                return '';
        }
    };

    const getSubText = (currentStep) => {
        switch (currentStep) {
            case 1:
                return 'Please enter your email address';
            case 2:
                return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 10 characters long';
            case 3:
                return 'You need to fill in everything to complete your Signup';
            case 4:
                return <>
                    You can log in after your administrator approves your membership
                    <br />
                    If you are rejected, please proceed with your membership again
                </>;
            default:
                return '';
        }
    };

    return (
        <>
            <SignTitle mainText={getMainText(signUpStep)} subText={getSubText(signUpStep)}/>
            <div className="sign_step_wrap">
                {signUpStep === 1 && <SignUpStepOne handleButtonClick={handleButtonClick} />}
                {signUpStep === 2 && <SignUpStepTwo handleButtonClick={handleButtonClick} />}
                {signUpStep === 3 && <SignUpStepThree/>}
                {signUpStep === 4 && <SignUpStepFour/>}
            </div>
        </>
    );
};

export default SignUpForm;