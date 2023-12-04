import axios from "axios";

// 로그인
export const Login = async (userId, passWord) => {
    const formData = new FormData();

    formData.append('id', userId);
    formData.append('password', passWord);

    try {
        const response = await axios.post(`${process.env.REACT_APP_OMS_API_URL}/anonymous/login`, formData, {
            headers: {
                'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
            }
        });

        return response.data;
    } catch (error) {
        console.error("API login error:", error);
        throw error;
    }
};

// 회원 가입
export const Register = async (signUpStep, stage, id, domain, authCode = null, selectedBranch, selectedHeadOffice, selectedTeam, selectedPosition, birth, fullName, passWord) => {
    const formData = new FormData();

    if (signUpStep === 1) {
        formData.append('id', `${id}@${domain}`);
        formData.append('stage', stage.toString());
        if (authCode) formData.append('code', `${authCode}`);
    } else if (signUpStep === 3) {
        const signUpUserId = `${id}@${domain}`;

        formData.append('stage', '3');
        formData.append('id', signUpUserId);
        formData.append('branch', selectedBranch);
        formData.append('department', selectedHeadOffice);
        formData.append('team', selectedTeam);
        formData.append('position', selectedPosition);
        formData.append('birth', birth);
        formData.append('name', fullName);
        formData.append('password', passWord);
    }

    const response = await axios.post(`${process.env.REACT_APP_OMS_API_URL}/anonymous/register`, formData, {
        headers: {
            'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
        }
    });

    return response.data;
};

// 비밀번호 찾기
export const TemporaryPassword = async (userId, birth) => {
    const formData = new FormData();

    formData.append('id', userId);
    formData.append('birth', birth);

    const response = await axios.post(
        `${process.env.REACT_APP_OMS_API_URL}/anonymous/temporary-password`, formData, {
            headers: {
                'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
            }
        }
    );

    return response.data;
};

// 지사 옵션 가져오기
export const fetchBranchOptions = () => {
    return axios.get(`${process.env.REACT_APP_OMS_API_URL}/anonymous/branch`, {
        headers: {
            'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
        }
    }).then(response => response.data.map(data => ({ key: data.code, value: data.code })));
};

// 본부 옵션 가져오기
export const fetchHeadOfficeOptions = (selectedBranch) => {
    return axios.get(`${process.env.REACT_APP_OMS_API_URL}/anonymous/branch/${selectedBranch}/departments`, {
        headers: {
            'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
        }
    }).then(response => response.data.map(data => ({ key: data.department, value: data.name })));
};

// 팀 옵션 가져오기
export const fetchTeamOptions = (selectedBranch, selectedHeadOffice) => {
    return axios.get(`${process.env.REACT_APP_OMS_API_URL}/anonymous/branch/${selectedBranch}/departments/${selectedHeadOffice}/teams`, {
        headers: {
            'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
        }
    }).then(response => response.data.map(data => ({ key: data.team, value: data.team })));
};

// 직급 옵션 가져오기
export const fetchPositionOptions = (selectedBranch) => {
    return axios.get(`${process.env.REACT_APP_OMS_API_URL}/anonymous/branch/${selectedBranch}/positions`, {
        headers: {
            'authorization': process.env.REACT_APP_AUTHORIZATION_KEY
        }
    }).then(response => response.data.map(data => ({ key: data.position, value: data.position })));
};