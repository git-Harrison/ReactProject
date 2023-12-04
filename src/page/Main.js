import React, {useContext, useEffect} from 'react';
import {MessageContext} from "../contexts/MessageContext";
import ApexGraphChart from "../components/chart/ApexGraphChart";
import UseFetchApexChart from "../containers/main/UseFetchApexChart";
import BestItem from "../containers/main/BestItem";
import TotalSales from "../containers/main/TotalSales";
import ExchangeRate from "../containers/main/ExchangeRate";
import BrandCount from "../containers/main/BrandCount";

const MainPage = () => {
    const {setExplanation} = useContext(MessageContext);
    const chartDataValue = UseFetchApexChart();
    const noticeMsg = "* This is a dashboard that provides a brief overview of this month's sales performance.";

    useEffect(() => {
        setExplanation(noticeMsg);
    }, []);

    return (
        <>
            <div className="contents_box">
                <div className="left_contents">
                    <TotalSales/>
                    <BrandCount/>
                    <ApexGraphChart {...chartDataValue} />
                </div>
                <div className="right_contents">
                    <ExchangeRate/>
                    <BestItem/>
                </div>
            </div>
        </>
    );
}

export default MainPage;