import React, {useState} from 'react';
import ProfileImageUpload from "../../../components/member/user/ProfileImageUpload";
import Button from "../../button/Button";
import ProfileImage from "./ProfileImage";
import ApiRequestModal from "../../modal/ApiRequestModal";

function MyPageMainInfo(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(true);
    };

    return (
        <>
            <div className="card user_mypage">
                <div className="mypage_user_id_wrap">
                    {/*<ProfileImageUpload/>*/}
                    <ProfileImage className="user_profile_nav_image"/>
                    <div className="mypage_user_id">
                        <span className="mypage_user_branch">{props.branch}</span>
                        {props.id}
                    </div>
                    <Button type="button" className="nomal_btn" onClick={handleButtonClick} label="Change Password"/>
                    <ApiRequestModal isOpen={modalOpen} close={() => setModalOpen(false)} apiIntention="changePassword"
                                     mainTitle="Change Password"/>
                </div>
            </div>
        </>
    );
}

export default MyPageMainInfo;