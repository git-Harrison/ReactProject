import axios from "axios";
import {DeCrypt} from "./crypto/CryptoService";

// 회원 리스트 가져오기
export const MemberListRequest = async (userId, status, name, branch, department, position, pagination, page) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const userInfoStatus = localStorage.getItem('userInfoStatus');

    let apiUrl = `${process.env.REACT_APP_OMS_API_URL}/auth/member`;
    const queryParams = [];

    if (userId) queryParams.push(`id=${userId}`);
    if (department) queryParams.push(`department=${department}`);
    if (name) queryParams.push(`name=${name}`);
    if (branch) queryParams.push(`branch=${branch}`);
    if (position) queryParams.push(`position=${position}`);
    if (pagination) queryParams.push(`pagination=${pagination}`);
    if (page) queryParams.push(`page=${page}`);

    queryParams.push(`status=${status || userInfoStatus}`);

    if (queryParams.length) {
        apiUrl += '?' + queryParams.join('&');
    }

    const response = await axios.get(apiUrl, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

export const MemberConfirm = async (selectedId, status, confirmed_by, grant) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const formData = new FormData();

    formData.append('id', selectedId);
    formData.append('status', status);
    formData.append('confirmed_by', confirmed_by);
    formData.append('grant', grant);

    const response = await axios.post(`${process.env.REACT_APP_OMS_API_URL}/auth/member/confirm`, formData, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response;
};

export const MemberInfoEdit = async (apiIntention, userId, passWord, selectedBranch, selectedTeam, selectedHeadOffice, selectedPosition, birth, fullName) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const formData = new FormData();

    formData.append('id', userId);
    formData.append('status', 1);

    switch(apiIntention) {
        case 'changePassword':
            formData.append('password', passWord);
            break;

        case 'viewProfileinfo':
            formData.append('birth', birth);
            formData.append('name', fullName);
            break;

        case 'editProfileinfo':
            formData.append('branch', selectedBranch);
            formData.append('team', selectedTeam);
            formData.append('department', selectedHeadOffice);
            formData.append('position', selectedPosition);
            break;

        default:
            break;
    }

    const response = await axios.post(`${process.env.REACT_APP_OMS_API_URL}/auth/member/edit`, formData, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response;
};