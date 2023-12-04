import React from 'react';

function NoticeNav(show) {
    return (
        <div className={`user_profile_wrap notice_nav ${show ? 'slide-in-animation' : ''}`}>
            <div className="user_profile_row">
                <h4 className="user_profile_title">OMS 공지사항</h4>
                <div className="user_profile notice_nav">
                    <ul>
                        <li>Amazon 1월 ~ 6월 데이터 새로 받는 중으로 NetIncome 데이터는 11월 15일 이후 확인 가능합니다 </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NoticeNav;