import React, {useState} from "react";
import SignTitle from "../../../components/member/sign/SignTitle";
import ForgotStepOne from "./ForgotStepOne";
import ForgotStepTwo from "./ForgotStepTwo";
import {useSelector} from "react-redux";
import {TemporaryPassword} from "../../../services/SignService";

const ForgotForm = () => {
    const {id, domain} = useSelector((state) => state.signUp);

    const [birth, setBirth] = useState("");
    const [forgotStep, setForgotStep] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const userId = id + "@" + domain;

    const fetchData = async () => {
        try {
            const responseData = await TemporaryPassword(userId, birth);

            if (responseData === "success") {
                setForgotStep(2);
            }

            if (responseData === 400) {
                throw new Error("Invalid member. Please check if the member has been approved for membership approval");
                setModalMessage("Please enter your ID and birth correctly");
                setModalOpen(true);
            }

        } catch (error) {
            if (error.message === "Invalid member. Please check if the member has been approved for membership approval") {
                setModalMessage(error.message);
                setModalOpen(true);
            } else {
                setModalMessage("Please enter your ID and birth correctly");
                setModalOpen(true);
            }
        }
    };

    const handleButtonClick = () => {
        if (!id || !birth) {
            setModalMessage("Please enter both ID and birth");
            setModalOpen(true);
            return;
        }

        if (!domain) {
            setModalMessage("Please select a domain");
            setModalOpen(true);
            return;
        }

        id && birth && domain && fetchData();
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    const getSubText = (currentStep) => {
        switch (currentStep) {
            case 1:
                return 'Already have an Account?';
            case 2:
                return 'Please log in with the temporary password sent to your email and change your password';
            default:
                return '';
        }
    };

    const forgotStepOneProps = {
        id,
        birth,
        setBirth,
        domain,
        handleButtonClick,
        isModalOpen,
        closeModal,
        modalMessage
    };

    return (
        <>
            <SignTitle mainText={forgotStep === 1 ? "Forgot your password?" : "Temporary Password Issuance Completed"}
                       subText={getSubText(forgotStep)}/>
            <div className="sign_step_wrap">
                {forgotStep === 1 && <ForgotStepOne {...forgotStepOneProps} />}
                {forgotStep === 2 && <ForgotStepTwo />}
            </div>
        </>
    );
}

export default ForgotForm;