import React, {useContext, useEffect, useState} from "react";
import UserInputHandler from "../../containers/report/UserInputHandler";
import useSelectedState from "../../hooks/SelectState";
import StoreSelect from "../../components/select/StoreSelect";
import NoDataMsg from "../../components/NoDataMsg";
import LoadingMsg from "../../components/LoadingMsg";
import ApexGraphChart from "../../components/chart/ApexGraphChart";
import MonthlySellerTable from "../../components/table/MonthlySellerTable";
import {MessageContext} from "../../contexts/MessageContext";
import {Report} from "../../services/ReportService";

const MonthlyAmountSeller = () => {
    const { setExplanation } = useContext(MessageContext);
    const selectedState = useSelectedState();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCriteria, setSelectedCriteria] = useState("orders");
    const {
        selectedStore,
        handleChannelChange,
        handleStoreChange,
    } = useSelectedState();

    const channels = [
        { key: "Amazon", value: "Amazon" },
    ];

    const fetchData = async () => {
        setLoading(true);

        const finalApiURL = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/sellerMonthly?channel=Amazon&merchant_token=${selectedStore}`;
        const responseData = await Report(finalApiURL);

        setData(responseData);
        setLoading(false);
    };

    const fetchDataBasedOnCriteria = (criteria, type) => {
        switch (criteria) {
            case "orders":
                return months.map(month => data[0]?.[type][0]?.[month].orders);
            case "payment":
                return months.map(month => data[0]?.[type][0]?.[month].payment);
            case "netIncome":
                return months.map(month => data[0]?.[type][0]?.[month].netIncome);
            default:
                return [];
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);
    const fetchInitialData = async () => {
        setLoading(true);

        const responseData = await Report(initialApiURL);

        setData(responseData);
        setLoading(false);
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fbaData = fetchDataBasedOnCriteria(selectedCriteria, "FBA");
    const fbmData = fetchDataBasedOnCriteria(selectedCriteria, "FBM");
    const initialApiURL = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/sellerMonthly?channel=Amazon&merchant_token=all`;

    const storeSticky = data[0]?.FBA[0]?.store;
    const stickyClass = storeSticky !== undefined ? "monthly_seller_store_table" : "";

    const noticeMsg = `* sales data for Amazon FBA/ FBM warehouses by location`;
    const noticeMonthly = ` 'Payment' basis: Based on the amount paid by the customer (shipped). `;
    const noticeMonthly2 = " 'Net income' basis: Excluding all Amazon fees, such as warehousing costs, but not excluding the cost of goods. (Data availability may increase once CMS integration is implemented)"

    useEffect(() => {
        setExplanation(
            <div>
                {noticeMsg}
                <br />
                <div className="notice_monthly">
                    {noticeMonthly}
                    <br></br>
                    {noticeMonthly2}
                </div>
            </div>
        );
    }, []);

    const defaultStore = "Store Total";

    const initialSelect = {
        store: defaultStore
    };

    return (
        <div className={`monthly_seller_page ${stickyClass}`}>
            <UserInputHandler
                pageMode="monthlySeller"
                channelOptions={channels}
                storeSelect={<StoreSelect onSelectChange={handleStoreChange}  initialSelect={initialSelect} pageMode="monthlySeller" apiUrl={selectedState.apiUrl}/>}
                handleChannelChange={handleChannelChange}
                fetchData={fetchData}
            />
            {!data.length && !loading ? (
                <NoDataMsg className="table" msg="Please choose the condition" />
            ) : loading ? (
                <LoadingMsg className="table" />
            ) : (
                <>
                    <ApexGraphChart
                        type="bar"
                        title={`Amazon Monthly ${selectedCriteria.charAt(0).toUpperCase() + selectedCriteria.slice(1)}`}
                        categories={months}
                        data1={fbaData}
                        data2={fbmData}
                        criteria={['FBA', 'FBM']}
                        colors={['#F2A2C8', '#77C3F2']}
                        criteriaType={selectedCriteria}
                        height={'300px'}
                        selectedCriteria={selectedCriteria}
                        setSelectedCriteria={setSelectedCriteria}
                    />
                    <MonthlySellerTable data={data} fetchData={fetchData} pageMode="monthlySeller" />
                </>

            )}
        </div>
    );
}

export default MonthlyAmountSeller;