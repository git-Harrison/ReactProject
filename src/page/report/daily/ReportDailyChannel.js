import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {MessageContext} from "../../../contexts/MessageContext";
import {fetchReportDataSuccess} from "../../../redux/actions/ReportActions";
import {Report, ReportTotal} from "../../../services/ReportService";
import DailyReportTable from "../../../components/table/DailyReportTable";
import LoadingMsg from "../../../components/LoadingMsg";
import UserSelectCondition from "../../../containers/report/UserSelectCondition";
import NoDataMsg from "../../../components/NoDataMsg";

const ReportDailyChannel = () => {
    const {setExplanation} = useContext(MessageContext);
    const dispatch = useDispatch();
    const reportData = useSelector(state => state.report.data);
    const reportTotal = useSelector(state => state.report.total);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);
    const [loading, setLoading] = useState(false);
    const [dataStatus, setDataStatus] = useState(false);
    const pageMode = "dailyChannel";

    const noticeMsg = "* This is a page where you can access daily order data. " +
        "You can review the number and amount of orders shipped, as well as the number and amount of orders in the pre-shipment state. " +
        "GMV stands for Gross Merchandise Value, which represents the total sales volume.";

    const getFormattedYesterdayDate = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return yesterday.toISOString().split('T')[0];
    };

    useEffect(() => {
        const formattedDate = getFormattedYesterdayDate();
        const fetchInitialReport = async () => {
            setLoading(true);

            const finalApiURL = `${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/order/daily/channel?channel=All&start_date=${formattedDate}&end_date=${formattedDate}`;
            const finalTotalApiURL = `${process.env.REACT_APP_REPORT_DASHBOARD_API_URL}/order/daily-total/channel?channel=All&start_date=${formattedDate}&end_date=${formattedDate}`;

            try {
                const responseData = await Report(finalApiURL);
                const responseTotalData = await ReportTotal(finalTotalApiURL);

                setDataStatus(true);
                dispatch(fetchReportDataSuccess(responseData, responseTotalData));
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
        total: reportTotal
    };

    const initialValues = {
        channel: "All",
        startDate: getFormattedYesterdayDate(),
        endDate: getFormattedYesterdayDate()
    };

    return (
        <>
            <UserSelectCondition pageMode={pageMode} loading={loading} setLoading={setLoading} initialValues={initialValues}/>
            {loading ? (
                <LoadingMsg className="table"/>
            ) : (
                dataStatus ? <DailyReportTable reportData={reportInfo}/> : <NoDataMsg className="table" msg="No data found"/>
            )}
        </>
    );
}

export default ReportDailyChannel;







