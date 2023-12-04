import React, {useState, useContext, useRef, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Button from "../button/Button";
import ThemeSettings from "./theme/ThemeSettings";
import {BiCommand} from "react-icons/bi";
import PageExplanation from "./PageExplanation";
import {MessageContext} from "../../contexts/MessageContext";
import {ActiveContext} from "../../contexts/ActiveContext";
import UserProfileNav from "../nav/UserProfileNav";
import useOutsideAlerter from "../../hooks/UseOutsideAlerter";
import ProfileImage from "../member/user/ProfileImage";
import {FiMessageSquare} from "react-icons/fi";
import NoticeNav from "../nav/NoticeNav";

function Header() {
    const {explanation} = useContext(MessageContext);
    const {active, setActive} = useContext(ActiveContext);
    const location = useLocation();
    const [showSetting, setShowSetting] = useState(false);
    const [isFixedTopbar, setIsFixedTopbar] = useState(false);
    const [buttons, setButtons] = useState(false);
    const [memoActive, setMemoActive] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const userProfilePageRef = useRef(null);
    const imageButtonRef = useRef(null);
    const [showNoticeNav, setShowNoticeNav] = useState(false);
    const noticeNavRef = useRef(null);
    const noticeButtonRef = useRef(null);
    useOutsideAlerter(userProfilePageRef, imageButtonRef, () => setShowUserProfile(false));
    useOutsideAlerter(noticeNavRef, noticeButtonRef, () => setShowNoticeNav(false));


    // 메뉴 클릭 핸들러
    const handleMenuClick = () => setActive(!active);
    const handleButtonClick = () => {
        setButtons(!buttons);
        setMemoActive(false);
    };
    const handleSettingClick = (event) => {
        event.stopPropagation();
        setShowSetting(!showSetting);
    };
    const handleExplanationOpen = (event) => {
        event.stopPropagation();
        setMemoActive(!memoActive);
    };
    const handleMenuClose = () => setShowSetting(false);
    const handleFixedTopbarToggle = (isChecked) => setIsFixedTopbar(isChecked);
    const handleUserProfileToggle = (event) => {
        event.stopPropagation();
        setTimeout(() => {
            setShowUserProfile(prev => !prev);
        }, 0);
    };

    const handleNoticeToggle = (event) => {
        event.stopPropagation();
        setShowNoticeNav(prev => !prev);
    };

    useEffect(() => {
        setShowUserProfile(false);
    }, [location.pathname]);

    return (
        <>
            <header className={isFixedTopbar ? 'header_area fixed_topbar' : 'header_area'}>
                <div className="header_wrapper">
                    <div className="header_contents">
                        <div className="header_icon">
                            <Button type="button" className="menu_btn icon_btn" onClick={handleMenuClick}
                                    label="menu_btn"/>
                            <div className="header_nav">
                                {/*<div className="notice_msg_icon_wrap" onClick={handleNoticeToggle}>*/}
                                <div className="notice_msg_icon_wrap">
                                    <FiMessageSquare className="notice_msg_icon"/>
                                </div>
                                <ProfileImage onClick={handleUserProfileToggle}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {showNoticeNav && (
                <div ref={noticeNavRef}>
                    <NoticeNav show={showNoticeNav}/>
                </div>
            )}

            {showUserProfile && (
                <div ref={userProfilePageRef}>
                    <UserProfileNav show={showUserProfile}/>
                </div>
            )}

            <div className="icon_menu_btn_wrap">
                <div className={`icon_menu_btn_row ${buttons ? "active" : ""}`} onClick={handleButtonClick}>
                    <div className="icon">
                        <BiCommand/>
                    </div>
                    <Button type="button" className="settings_btn" onClick={handleSettingClick} label="settings_btn"/>
                    <Button type="button" className="memo_btn" onClick={handleExplanationOpen} label="memo_btn"/>
                </div>
            </div>

            {memoActive && <PageExplanation explanation={explanation}/>}
            {showSetting && <ThemeSettings onClose={handleMenuClose} onFixedTopbarToggle={handleFixedTopbarToggle}/>}
        </>
    );
}

export default Header;