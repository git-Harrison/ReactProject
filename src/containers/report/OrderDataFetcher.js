import {useState, useEffect} from "react";
import {Report} from "../../services/ReportService";

const OrderDataFetcher = (props) => {
    const {pageMode, selectedState, initialApiURL, shopifyInitialApiURL, tiktokInitialApiURL} = props; // 데일리에서 수정된 부분 shopifyInitialApiURL (나중에 뷰 서버 생기면 다시 원복해야함)
    const [data, setData] = useState([]); // 데이터 상태 관리
    const [dataTotal, setDataTotal] = useState([]); // 데이터 상태 관리
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [fetchButtonClicked, setFetchButtonClicked] = useState(false); // fetch_button 클릭 상태 관리
    const [didMount, setDidMount] = useState(false); // 컴포넌트 마운트 여부 상태 관리
    const [onPageMode] = useState(pageMode); // 데이터 상태 관리
    const [storeValue, setStoreValue] = useState("");

    const {
        selectedChannel,
        selectedStore,
        selectedType,
        selectedStartDate,
        selectedEndDate,
        selectedMonth,
        selectedTimeZone,
        selectedSeller,
        apiUrl,
    } = selectedState;

    const appendURLParams = (params, key, value) => {
        if (value) params.append(key, value); // URL 파라미터에 키와 값 추가
    }

    const processResponseData = (data) => {
        if (pageMode !== 'monthly') {
            return data.map(item => ({
                ...item,
                value: item.value.toLocaleString(),
            }));
        } else {
            return data.map(item => ({
                ...item,
                sales: {
                    ...item.sales,
                    ...Object.fromEntries(
                        Object.entries(item.sales).map(([key, value]) => [
                            key,
                            value.toLocaleString(),
                        ])
                    )
                }
            }));
        }
    };

    const getApiUrlBasedOnPageMode = () => {
        switch (onPageMode) {

            case "monthly":
                if (selectedChannel === "Shopify") {
                    return `${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/orderMonthly`;
                } else if (selectedChannel === "Tiktokshop") {
                    return `${process.env.REACT_APP_REPORT_TIkTOK_API_URL}/orderMonthly`;
                } else {
                    return `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderMonthly`;
                }
                return `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderMonthly`;

            case "excel":
                return `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/payment-excel/list`;

            default:
                if (selectedChannel === "Shopify") {
                    return `${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/orderDaily`;
                } else if (selectedChannel === "Tiktokshop") {
                    return `${process.env.REACT_APP_REPORT_TIkTOK_API_URL}/orderDaily`;
                } else {
                    return `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderDaily`;
                }
        }
    };

    const fetchData = async (initialLoad = false) => { // 데일리에서 수정된 부분 initialLoad 이거 추가했음 (나중에 뷰 서버 생기면 다시 원복해야함)
        setLoading(true);
        setFetchButtonClicked(true);

        let params = new URLSearchParams();

        appendURLParams(params, 'channel', selectedChannel);
        appendURLParams(params, 'merchant_token', selectedStore);
        appendURLParams(params, 'type', selectedType);
        appendURLParams(params, 'startDate', selectedStartDate);
        appendURLParams(params, 'endDate', selectedEndDate);
        appendURLParams(params, 'month', selectedMonth);
        if (selectedChannel === "Amazon") {
            appendURLParams(params, 'timezone', selectedTimeZone);
        }

        const basicApiURL = getApiUrlBasedOnPageMode();

        const finalApiURL = [selectedChannel, selectedStore, selectedType, selectedStartDate, selectedEndDate, selectedMonth, selectedTimeZone, selectedSeller].some(item => item)
            ? `${basicApiURL}?${params.toString()}`
            : initialApiURL;

        if (!finalApiURL) {
            return resetLoadingAndData();
        }

        try {
            let responseData = await Report(finalApiURL);
            // 데일리에서 수정된 부분 (나중에 뷰 서버 생기면 다시 원복해야함)
            if (initialLoad && shopifyInitialApiURL && tiktokInitialApiURL) {
                const shopifyData = await Report(shopifyInitialApiURL);
                const tiktokData = await Report(tiktokInitialApiURL);
                if (shopifyData && shopifyData.length > 0) {
                    responseData = [...responseData, ...shopifyData, ...tiktokData];
                }
            }

            if (!responseData) throw new Error("Request error");

            (pageMode === "daily" || pageMode === "monthly") ? setDataWithTotal(responseData, initialLoad) : setData(responseData);
            setFetchButtonClicked(!!responseData.length);
            setStoreValue(onPageMode !== "excel" && selectedStore);

        } catch (error) {
            resetLoadingAndData();
        } finally {
            setLoading(false);
        }
    };
    // 데일리에서 수정된 부분 (나중에 뷰 서버 생기면 다시 원복해야함 원복을 어떻게 해야하지.. git commit 메세지 원복해야함 으로 시작)
    const setDataWithTotal = (responseData, initialLoad) => {
        if (pageMode === "daily") {
            if (responseData.length > 1) {
                const combinedAmount = [...responseData[1].amount, ...responseData[2].amount, ...responseData[0].amount];
                const combinedTotal = {
                    orders_shipped: responseData[0].total[0].orders_shipped + responseData[1].total[0].orders_shipped + responseData[2].total[0].orders_shipped,
                    orders_unshipped: responseData[0].total[0].orders_unshipped + responseData[1].total[0].orders_unshipped + responseData[2].total[0].orders_unshipped,
                    payment_shipped: (parseFloat(responseData[0].total[0].payment_shipped.replace(/,/g, '')) + parseFloat(responseData[1].total[0].payment_shipped.replace(/,/g, '')) + parseFloat(responseData[2].total[0].payment_shipped.replace(/,/g, ''))).toLocaleString(),
                    payment_unshipped: (parseFloat(responseData[0].total[0].payment_unshipped.replace(/,/g, '')) + parseFloat(responseData[1].total[0].payment_unshipped.replace(/,/g, '')) + parseFloat(responseData[2].total[0].payment_unshipped.replace(/,/g, ''))).toLocaleString(),
                    netIncome: (parseFloat(responseData[0].total[0].netIncome.replace(/,/g, '')) + parseFloat(responseData[1].total[0].netIncome.replace(/,/g, '')) + parseFloat(responseData[2].total[0].netIncome.replace(/,/g, ''))).toLocaleString(),
                };

                setData(combinedAmount);
                setDataTotal([combinedTotal]);
            } else if (responseData.length === 1) {
                setData(responseData[0].amount);
                setDataTotal(responseData[0].total);
            }
        } else if (pageMode === "monthly") { // 월별 페이지 수정 부분 ( 처음 로드 화면 아마존 + 쇼피파이 값 )
            if (initialLoad) {
                const amazonSales = responseData[0].sales;
                const shopifySales = responseData[1].sales;
                const tiktokSales = responseData[2].sales;

                let combinedSales = {};

                for (const [month, amazonData] of Object.entries(amazonSales)) {
                    const shopifyData = shopifySales[month];
                    const tiktokData = tiktokSales[month];

                    combinedSales[month] = {
                        orders: amazonData.orders + shopifyData.orders + tiktokData.orders,
                        payment: amazonData.payment + shopifyData.payment + tiktokData.payment,
                        netIncome: amazonData.netIncome + shopifyData.netIncome + tiktokData.netIncome
                    };
                }

                const combinedData = {
                    channel: "Total",
                    sales: combinedSales
                };

                setData([combinedData]);
            } else {
                setData(responseData);
            }
        }
    }

    const resetLoadingAndData = () => {
        setLoading(false);
        setData([]);
    };

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount && onPageMode !== "excel") {
            fetchData(true);
        }
    }, [didMount, onPageMode]);

    return {data, dataTotal, loading, fetchButtonClicked, storeValue, fetchData};
}

export default OrderDataFetcher;