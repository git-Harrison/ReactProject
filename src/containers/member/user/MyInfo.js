import React, {useState, useEffect} from 'react';
import MyPageMainInfo from "../../../components/member/user/MyPageMainInfo";
import MyPageSubInfo from "../../../components/member/user/MyPageSubInfo";
import {MemberListRequest} from "../../../services/MemberService";
import {DeCrypt} from "../../../services/crypto/CryptoService";

function ViewProfile() {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const [reloadUserInfo, setReloadUserInfo] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const fetchData = async () => {
        try {

            const response = await MemberListRequest(userInfoId);

            if (!response.data[0]) {
                throw new Error(`Failed to fetch user data with status code: ${response.status}`);
            }

            setUserInfo(response.data[0]);
        } catch (error) {
            console.error('API 에러 :', error);
        }
    };

    const handleInfoModify = () => {
        setReloadUserInfo(prev => !prev);
    };

    useEffect(() => {
        fetchData();
    }, [reloadUserInfo]);

    return (
        <>
            <MyPageMainInfo
                branch={userInfo?.branch}
                id={userInfo?.id}
            />
            <MyPageSubInfo
                userInfoData={userInfo}
                onInfoModify={handleInfoModify}
            />
        </>
    );
}

export default ViewProfile;