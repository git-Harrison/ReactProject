import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../button/Button";
import UserPassword from "../../containers/member/user/UserPassword";
import {useDispatch, useSelector} from "react-redux";
import {resetSignUp, setPasswordError} from "../../redux/actions/SignUpActions";
import UserProfileInfo from "../member/user/UserProfileInfo";
import SignTitle from "../member/sign/SignTitle";
import {MemberInfoEdit} from "../../services/MemberService";
import {DeCrypt, EnCrypt} from "../../services/crypto/CryptoService";

const ApiRequestModal = (props) => {
    const {isOpen, close, apiIntention, mainTitle, userInfoData, onInfoModify} = props;

    const dispatch = useDispatch();
    const {passWord, rePassWord} = useSelector(state => state.signUp);

    const navigate = useNavigate();

    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedHeadOffice, setSelectedHeadOffice] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [teamOptions, setTeamOptions] = useState([]);
    const [birth, setBirth] = useState("");
    const [fullName, setFullName] = useState("");
    const [apiCallEnd, setApiCallEnd] = useState(false);
    const [showNoChangeMessage, setShowNoChangeMessage] = useState(false);

    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal_wrap') {
            close();
            setApiCallEnd(false);
        }
    }

    const isUserInfoModified = () => {
        if (userInfoData.branch !== selectedBranch) return true;
        if (userInfoData.team !== selectedTeam) return true;
        if (userInfoData.department !== selectedHeadOffice) return true;
        if (userInfoData.position !== selectedPosition) return true;
        if (userInfoData.birth !== birth) return true;
        if (userInfoData.name !== fullName) return true;

        return false;
    }

    const renderComponentByIntention = () => {
        switch (apiIntention) {
            case 'changePassword':
                return <UserPassword/>;
            case 'viewProfileinfo':
                return <UserProfileInfo
                    apiIntentions={apiIntention}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    selectedHeadOffice={selectedHeadOffice}
                    setSelectedHeadOffice={setSelectedHeadOffice}
                    selectedPosition={selectedPosition}
                    setSelectedPosition={setSelectedPosition}
                    teamOptions={teamOptions}
                    setTeamOptions={setTeamOptions}
                    birth={birth}
                    setBirth={setBirth}
                    fullName={fullName}
                    setFullName={setFullName}
                    defaultUserInfo={userInfoData}
                />;
            case 'editProfileinfo':
                return <UserProfileInfo
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    selectedHeadOffice={selectedHeadOffice}
                    setSelectedHeadOffice={setSelectedHeadOffice}
                    selectedPosition={selectedPosition}
                    setSelectedPosition={setSelectedPosition}
                    teamOptions={teamOptions}
                    setTeamOptions={setTeamOptions}
                    birth={birth}
                    setBirth={setBirth}
                    fullName={fullName}
                    setFullName={setFullName}
                    defaultUserInfo={userInfoData}
                    apiIntention={apiIntention}

                />;
            default:
                return null;
        }
    }

    const fetchData = async (apiIntention) => {
        try {
            let userId;

            if (apiIntention === "editProfileinfo") {
                userId = userInfoData.id;
            } else {
                userId = DeCrypt(localStorage.getItem('userInfoId'));
            }

            const response = await MemberInfoEdit(apiIntention, userId, passWord, selectedBranch, selectedTeam, selectedHeadOffice, selectedPosition, birth, fullName);

            if (response.status === 200) {
                setApiCallEnd(true);
                if (apiIntention === 'viewProfileinfo') {
                    localStorage.setItem('userInfoId', EnCrypt(userId));
                    localStorage.setItem('userInfoName', EnCrypt(fullName));
                }
            } else if (response.status === 400) {
                console.error('Error: Bad Request');
                return;
            }

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const apiRequestBtnClick = () => {
        switch (apiIntention) {
            case 'changePassword':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{10,})$/;

                if (!passWord || !rePassWord) {
                    dispatch(setPasswordError('* Password fields cannot be empty'));
                } else if (!passwordRegex.test(passWord)) {
                    dispatch(setPasswordError('* Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 10 characters long'));
                } else if (passWord !== rePassWord) {
                    dispatch(setPasswordError('* Passwords do not match'));
                } else {
                    dispatch(setPasswordError(''));
                    fetchData(apiIntention);
                }
                break;
            default:
                if (isUserInfoModified()) {
                    fetchData(apiIntention);
                    setShowNoChangeMessage(false);
                } else {
                    setShowNoChangeMessage(true);
                }
                break;
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        dispatch(resetSignUp());
        setApiCallEnd(false);
        navigate('/signIn');
    };

    const handleInfoModify = () => {
        setApiCallEnd(false);
        onInfoModify(true);
        close();
    }

    const handleEditSuccess = () => {
        if (apiCallEnd) {
            if (props.fetchMemberData) {
                props.fetchMemberData();
            }
            setApiCallEnd(false);
        }
        close();
    }

    return (
        <div className="modal_wrap" onClick={handleOutsideClick}>
            <div className="modal api_request_modal">
                {apiCallEnd ? (
                    apiIntention === "changePassword" ? (
                        <>
                            <SignTitle mainText="Your password has been changed" subText="Please log back in with the changed password"/>
                            <Button type="button" className="logout_btn" onClick={handleLogout} label="SignIn"></Button>
                        </>
                    ) : apiIntention === "editProfileinfo" ? (
                        <>
                            <SignTitle mainText="Information has been successfully changed" subText="You can check the information right away without having to log in again"/>
                            <Button type="button" className="nomal_btn" onClick={handleEditSuccess} label="Close"></Button>
                        </>
                    ) : (
                        <>
                            <SignTitle mainText="My information has been successfully changed" subText="You can check the information right away without having to log in again"/>
                            <Button type="button" className="nomal_btn" onClick={handleInfoModify} label="Close"></Button>
                        </>
                    )
                ) : (
                    <>
                        <h3 className="main_title">{mainTitle}</h3>
                        {renderComponentByIntention()}
                        {showNoChangeMessage && <div className="unchanged_msg">Unchanged. Please exit via the close button</div>}
                        <div className="modal_button_area">
                            <button type="button" className="close_button" onClick={apiRequestBtnClick}>Modify</button>
                            <button type="button" className="close_button" onClick={close}>Close</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

ApiRequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    apiIntention: PropTypes.string.isRequired,
    mainTitle: PropTypes.string.isRequired
};

export default ApiRequestModal;