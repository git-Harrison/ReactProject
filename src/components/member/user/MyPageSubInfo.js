import React, {useState} from 'react';
import {BiEdit} from "react-icons/bi";
import ApiRequestModal from "../../modal/ApiRequestModal";

function MyPageSubInfo({userInfoData, onInfoModify}) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(!modalOpen);
    };

    const grantName = (grantNumber) => {
        switch (grantNumber) {
            case 1:
                return '최고 관리자';
            case 2:
                return '본부 관리자';
            case 3:
                return '관리자';
            case 4:
                return '기본 사용자';
            default:
                return '';
        }
    };

    function formatDate(birth) {
        if (birth && birth.length === 8) {
            return `${birth.substring(0, 4)}-${birth.substring(4, 6)}-${birth.substring(6, 8)}`;
        }
        return birth;
    }

    return (
        <>
            <div className="card user_mypage">
                <div className="user_info_top">
                    <h4 className="user_profile_title">User Profile Info</h4>
                    <BiEdit className="edit_icon" onClick={handleButtonClick}/>
                    <ApiRequestModal isOpen={modalOpen} userInfoData={userInfoData} close={() => setModalOpen(false)}
                                     onInfoModify={onInfoModify}
                                     apiIntention="viewProfileinfo"
                                     mainTitle="Change User Profile"/>
                </div>
                <ul className="user_info_wrap">
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Department</div>
                        <div className="user_info_text">{userInfoData?.department || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Team</div>
                        <div className="user_info_text">{userInfoData?.team || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Position</div>
                        <div className="user_info_text">{userInfoData?.position || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Name</div>
                        <div className="user_info_text">{userInfoData?.name || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Birth</div>
                        <div className="user_info_text">{formatDate(userInfoData?.birth) || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Nick Name</div>
                        <div className="user_info_text">{userInfoData?.nickname || "null"}</div>
                    </li>
                    <li className="user_info_row">
                        <div className="user_info_title user_info_text">Grade</div>
                        <div className="user_info_text">{grantName(userInfoData?.grant) || "null"}</div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MyPageSubInfo;