import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {MessageContext} from "../../../contexts/MessageContext";
import {Report} from "../../../services/ReportService";
import LoadingMsg from "../../../components/LoadingMsg";
import MonthlyAmountTable from "../../../components/table/MonthlyAmountTable";
import UserSelectCondition from "../../../containers/report/UserSelectCondition";
import {fetchReportDataSuccess} from "../../../redux/actions/ReportActions";
import ApexMonthlyChart from "../../../components/chart/ApexMonthlyChart";
import DailyReportTable from "../../../components/table/DailyReportTable";
import NoDataMsg from "../../../components/NoDataMsg";

const MonthlyReport = () => {
    const dispatch = useDispatch();
    const {setExplanation} = useContext(MessageContext);
    const reportData = useSelector(state => state.report.data);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);
    const [loading, setLoading] = useState(false);
    const [dataStatus, setDataStatus] = useState(false);
    const pageMode = "monthly";

    const noticeMsg = "* This is a page where you can access monthly order data. " +
        "You can review the number and amount of orders shipped, as well as the number and amount of orders in the pre-shipment state. " +
        "GMV stands for Gross Merchandise Value, which represents the total sales volume.";

    useEffect(() => {
        const fetchInitialReport = async () => {
            setLoading(true);
            const finalApiURL = `${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/order/monthly?channel=All&brand_name=Total`;

            try {
                const responseData = await Report(finalApiURL);

                setDataStatus(true);
                dispatch(fetchReportDataSuccess(responseData));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setDataStatus(false);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialReport();
    }, [currentBranch]);

    useEffect(() => {
        setExplanation(noticeMsg);
    }, []);

    const reportInfo = {
        data: reportData,
    };

    const initialValues = {
        channel: "All",
        store: "Total"
    };

    return (
        <>
            <UserSelectCondition pageMode={pageMode} loading={loading} setLoading={setLoading}
                                 initialValues={initialValues}/>
            {loading ? (
                <LoadingMsg className="table"/>
            ) : (
                dataStatus ?
                    <>
                        <ApexMonthlyChart data={reportData} loading={loading}/>
                        <MonthlyAmountTable data={reportData}/>
                    </>
                    : <NoDataMsg className="table" msg="No data found"/>
            )}
        </>
    );
}

export default MonthlyReport;