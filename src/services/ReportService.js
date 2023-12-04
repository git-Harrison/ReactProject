import axios from "axios";
import store from '../redux/store/ConfigureStore';
import {DeCrypt} from "./crypto/CryptoService";
import {formatNumber} from "../utill/FormatNumber";

// 메인 페이지 이번달 매출액
export const OrderThisMonth = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/order/main-month?branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    const responseAmount = response.data.result.this_month_total.amount;
    const responseCurrency = response.data.result.this_month_total.currency;
    const responseData = `${formatNumber(responseAmount)} ${responseCurrency}`;

    return responseData;
};

export const MainBrandCount = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/account/main-brands?branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

// 메인 페이지 이번달, 저번달 비교 차트
export const OrderComparison = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/order/comparison?branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

// 메인 페이지 TOP5 상품
export const BestItems = async (finalApiURL) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${finalApiURL}&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

// 검색 조건이 필요한 경우 사용하는 공통 API
export const Report = async (finalApiURL) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${finalApiURL}&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

// 데일리 리포트에서만 사용하는 토탈 API
export const ReportTotal = async (finalApiURL) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${finalApiURL}&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};


// 쇼피파이 payout 엑셀 리스트 가져오기
export const ShopifyExcelList = async (yearMonth) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/excel/payout/list?month=${yearMonth}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

// 쇼피파이 payout 엑셀 파일 업로드
export const ShopifyExcelUploadRequest = async (file, year, selectedMonth, storeId) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const formData = new FormData();

    if (file) { // file이 존재할 경우만 formData에 추가
        formData.append("file", file);
    }

    formData.append("month", `${year}-${selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`}`);
    formData.append("store_id", storeId);

    const response = await axios.post(`${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/excel/payout`, formData, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response;
};

// 쇼피파이 summary 엑셀 리스트 가져오기
export const ShopifyExcelSummaryList = async (yearMonth) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    
    const response = await axios.get(`${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/excel/summary/list?month=${yearMonth}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

// 쇼피파이 summary 엑셀 파일 업로드
export const ShopifyExcelSummaryUploadRequest = async (file, year, selectedMonth, storeId) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    formData.append("month", `${year}-${selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`}`);
    formData.append("store_id", storeId);

    const response = await axios.post(`${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/excel/summary`, formData, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response;
};






