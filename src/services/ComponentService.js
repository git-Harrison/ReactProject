import axios from "axios";
import store from "../redux/store/ConfigureStore";
import {DeCrypt} from "./crypto/CryptoService";

export const Channels = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/account/channel?branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });
    return response.data.result;
}

export const TotalStores = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/account/brand?&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

export const Brands = async (channel) => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));
    const state = store.getState();
    const currentBranch = state.themeBranch.currentBranch;

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/brand?channel=${channel}&branch=${currentBranch}`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};

export const Branch = async () => {
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoToken = DeCrypt(localStorage.getItem('access_token'));

    const response = await axios.get(`${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/account/branch`, {
        headers: {
            'Oms-id': userInfoId,
            'authorization': userInfoToken
        }
    });

    return response.data.result;
};
