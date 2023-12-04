import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import Information from "../../components/button/Information";
import {OrderThisMonth} from "../../services/ReportService";
import LoadingMsg from "../../components/LoadingMsg";

const TotalSales = () => {
    const [thisMonthData, setThisMonthData] = useState(0);
    const [loading, setLoading] = useState(true);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseData = await OrderThisMonth();
                setThisMonthData(responseData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentBranch]);

    return (
        loading ? (
            <LoadingMsg className="total sales"/>
        ) : (
            <div className="main_total_sales card">
                <div className="main_total_sales_title_box">
                    <div className="main_total_sales_title">Total sales of the this month</div>
                    <Information text="The sales data from the 1st of this month up to yesterday (MTD)"/>
                </div>
                <div className="main_total_sales_data">{thisMonthData}</div>
            </div>
        )
    );
}
export default TotalSales;