import React, {useState, useEffect} from 'react';
import Button from "../../../components/button/Button";
import BasicModal from "../../../components/modal/BasicModal";
import {useDispatch, useSelector} from "react-redux";
import {
    setSignUpStep,
    resetPassWord,
    resetRePassWord,
} from '../../../redux/actions/SignUpActions';
import UserProfileInfo from "../../../components/member/user/UserProfileInfo";
import {Register} from "../../../services/SignService";

const SignUpStepThree = () => {
    const dispatch = useDispatch();
    const {signUpStep, id, domain, passWord} = useSelector((state) => state.signUp);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedHeadOffice, setSelectedHeadOffice] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectTeamOptions, setSelectTeamOptions] = useState([]);
    const [birth, setBirth] = useState("");
    const [fullName, setFullName] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const fetchData = async () => {
        try {
            const responseData = await Register(3, '3', id, domain, null, selectedBranch, selectedHeadOffice, selectedTeam, selectedPosition, birth, fullName, passWord);

            if (!responseData || responseData.status === 400) {
                console.error('Error: Bad Request');
                return;
            }

            dispatch(setSignUpStep(signUpStep + 1));

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSignUp = () => {
        if (!id || !domain || !selectedBranch || !selectedHeadOffice || !selectedTeam || !selectedPosition || !birth || !fullName || !passWord) {
            setModalOpen(true);
            setModalMessage('Please enter all items');
            return;
        }
        fetchData();
    };

    const handlePrevStep = () => {
        dispatch(setSignUpStep(signUpStep - 1));
        dispatch(resetPassWord());
        dispatch(resetRePassWord());
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <BasicModal
                isOpen={isModalOpen}
                close={closeModal}
                modalTitle="Alert"
                modalText={modalMessage}
            />
            <div>
                <UserProfileInfo
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    selectedHeadOffice={selectedHeadOffice}
                    setSelectedHeadOffice={setSelectedHeadOffice}
                    selectedPosition={selectedPosition}
                    setSelectedPosition={setSelectedPosition}
                    teamOptions={selectTeamOptions}
                    setTeamOptions={setSelectTeamOptions}
                    birth={birth}
                    setBirth={setBirth}
                    fullName={fullName}
                    setFullName={setFullName}
                />
                <div className="btns_wrap">
                    <Button
                        type="submit"
                        className="sign_btn mt-8"
                        label="Sign Up"
                        onClick={handleSignUp}
                    />
                    <Button
                        type="button"
                        className="link_btn mt-8"
                        label="Prev Step"
                        onClick={handlePrevStep}
                    />
                </div>
            </div>
        </>


    );
};

export default SignUpStepThree;