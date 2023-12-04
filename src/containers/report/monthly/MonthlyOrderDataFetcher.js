import React, {useEffect, useState} from "react";
import {Report} from "../../../services/ReportService";

export const MonthlyOrderDataFetcher = (props) => {
    const {selectedState} = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const hasStore = data[0]?.store;
    const months = data.length > 0 && data[0].sales ? Object.keys(data[0].sales) : [];
    const columns = ['Channel', ...(hasStore ? ['Store'] : []), ...months];

    const appendURLParams = (params, key, value) => {
        if (value) params.append(key, value);
    }

    const getApiUrlBase = () => {
        switch (selectedState.selectedChannel) {
            case "Amazon":
                return `https://apiv2.stylekorean.com/api/amazon/orderMonthly`;
            case "Shopify":
                return `${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/orderMonthly`;
        }
    }

    const fetchData = async () => {
        setLoading(true);

        let params = new URLSearchParams();
        appendURLParams(params, 'channel', selectedState.selectedChannel);
        appendURLParams(params, 'merchant_token', selectedState.selectedStore);

        const basicApiURL  = getApiUrlBase();
        const finalApiURL = [selectedState.selectedChannel, selectedState.selectedStore].some(item => item)
            ? `${basicApiURL}?${params.toString()}`
            : null;

        if (!finalApiURL) {
            return resetLoadingAndData();
        }

        try {
            let responseData = await Report(finalApiURL);

            setData(responseData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const resetLoadingAndData = () => {
        setLoading(false);
        setData([]);
    };

    return {data, loading, columns, months, fetchData};
};

export default MonthlyOrderDataFetcher;