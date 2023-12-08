import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import Information from "../../components/button/Information";
import {OrderThisMonth} from "../../services/ReportService";
import LoadingMsg from "../../components/LoadingMsg";
import {formatNumber} from "../../utill/FormatNumber";
import { IoTriangle } from "react-icons/io5";

const TotalSales = () => {
    const [thisMonthData, setThisMonthData] = useState(0);
    const [thisMonthRatio, setthisMonthRatio] = useState(0);
    const [loading, setLoading] = useState(true);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await OrderThisMonth();

                const responseAmount = response.this_month_total.amount;
                const responseRatio = response.ratio;
                const responseCurrency = response.this_month_total.currency;
                const responseData = `${formatNumber(responseAmount)} ${responseCurrency}`;

                setThisMonthData(responseData);
                setthisMonthRatio(responseRatio);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentBranch]);

    const ratioTriangleClass = thisMonthRatio >= 0 ? 'ratioTriangle triangleUp' : 'ratioTriangle triangleDown';
    const ratioTextClass = thisMonthRatio >= 0 ? 'ratioTextUp' : 'ratioTextDown';

    return (
        loading ? (
            <LoadingMsg className="total sales"/>
        ) : (
            <div className="main_total_sales card">
                <div className="main_total_sales_title_box">
                    <div className="main_total_sales_title">Total sales of the this month</div>
                    <Information text="The sales data from the 1st of this month up to yesterday (MTD)"/>
                </div>
                <div className="main_total_sales_data">
                    <span className="sales_data">{thisMonthData}</span>
                    <span className="ratio_triangle">
                        <IoTriangle className={ratioTriangleClass} />
                        <span className={ratioTextClass}>{thisMonthRatio}%</span>
                    </span>
                </div>
            </div>
        )
    );
}
export default TotalSales;