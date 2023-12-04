import React from "react";
import {useNavigate} from 'react-router-dom';
import Button from "../button/Button";
import ProfileImage from "../member/user/ProfileImage";
import {DeCrypt} from "../../services/crypto/CryptoService";
import {BsPersonVcard} from "react-icons/bs";

const UserProfileNav = (show) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signIn');
    };

    const handleViewProfileLink = () => {
        navigate('/viewProfile');
    };

    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoName = DeCrypt(localStorage.getItem('userInfoName'));
    const userInfoBranch = DeCrypt(localStorage.getItem('userInfoBranch'));
    const userInfoDepartment = DeCrypt(localStorage.getItem('userInfoDepartment'));
    const userInfoTeam = DeCrypt(localStorage.getItem('userInfoTeam'));
    const userInfoPosition = DeCrypt(localStorage.getItem('userInfoPosition'));

    return (
        <div className={`user_profile_wrap ${show ? 'slide-in-animation' : ''}`}>
            <div className="user_profile_row">
                <h4 className="user_profile_title">User Profile</h4>
                <div className="user_profile">
                    <ProfileImage className="user_profile_nav_image"/>
                    <div className="detail_wrap">
                        <h5 className="user_id">{userInfoBranch}</h5>
                        <h5 className="user_id">{userInfoDepartment} / {userInfoTeam}</h5>
                        <h4 className="user_name">{userInfoName} / {userInfoPosition}</h4>
                        <h5 className="user_id">{userInfoId}</h5>
                    </div>
                </div>
            </div>
            <ul className="mypage_btn_wrap">
                <li className="mypage_btn" onClick={handleViewProfileLink} title="View My Profile Details">
                    <div className="mypage_link_icon">
                        <BsPersonVcard className="mypage_icon"/>
                    </div>
                    <div className="mypage_link_text">
                        <h3>My Profile</h3>
                        <h4>Account Settings</h4>
                    </div>
                </li>
            </ul>
            <Button type="button" className="logout_btn" onClick={handleLogout} label="Logout" title="Logout"/>
        </div>
    );
};

export default UserProfileNav;
