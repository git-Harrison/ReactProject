import axios from "axios";
import {DeCrypt} from "./crypto/CryptoService";

// 오더 리스트 가져오기
export const OrderListRequest = async (apiUrl, page) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${apiUrl}&page=${page}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

// 오더 리스트 검색
export const OrderListSearchRequest = async (search) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${process.env.REACT_APP_REPORT_AMAZON_API_URL}/order?amazon_order_id=${search}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

