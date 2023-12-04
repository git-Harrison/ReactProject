import axios from "axios";
import store from "../redux/store/ConfigureStore";
import {DeCrypt} from "./crypto/CryptoService";

export const Channels = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/channel?branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });
    return response.data.result;
}

export const Stores = async (currentChannel) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/brand?channel=${currentChannel}&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

export const Brands = async (apiUrl) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${apiUrl}/brands`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data;
};

export const Branch = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/branch`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};
