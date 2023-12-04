import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../../components/button/Button";
import SignEmailForm from "../../../components/member/sign/SignEmailForm";
import FormTextInput from "../../../components/input/FormTextInput";
import BasicModal from "../../../components/modal/BasicModal";

const ForgotStepOne = ({ id, domain, birth, setBirth, handleButtonClick, isModalOpen, closeModal, modalMessage }) => {

    return (
        <>
            <BasicModal
                isOpen={isModalOpen}
                close={closeModal}
                modalTitle="Alert"
                modalText={modalMessage}
            />
            <form action="" className="forgot_form">
                <SignEmailForm id={id} domain={domain}/>
                <FormTextInput
                    type="text"
                    tagId="signup_birth"
                    wrapperClassName="birthdayChange"
                    className="form_text_input id_input"
                    placeholder="ex) 19941228"
                    label="Birth Date"
                    maxLength={8}
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />
            </form>
            <Button type="submit" className="sign_btn" onClick={handleButtonClick}
                    label="Send temporary passwords"/>
            <Link to=".." relative="path">
                <Button type="button" className="link_btn mt-8" label="Back to Login"/>
            </Link>
        </>
    );
}

export default ForgotStepOne;