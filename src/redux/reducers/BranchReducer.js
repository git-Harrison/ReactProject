import {DeCrypt} from "../../services/crypto/CryptoService";

const userInfoBranchItem = localStorage.getItem('userInfoBranch');
let userInfoBranch = userInfoBranchItem ? DeCrypt(userInfoBranchItem) : null;

// userInfoBranch가 'KR'일 경우에만 'US'로 설정합니다.
if (userInfoBranch === 'KR') {
    userInfoBranch = 'US';
}
const initialState = {
    currentBranch: userInfoBranch // 기본값 설정
};

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_BRANCH':
            return {
                ...state,
                currentBranch: action.payload
            };
        default:
            return state;
    }
};

export default branchReducer;