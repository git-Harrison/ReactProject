import React, {useState} from "react";
import NoDataMsg from "../NoDataMsg";
import {formatNumber} from "../../utill/FormatNumber";

export const MonthlyAmountTable = (props) => {
    const { data } = props;

    const reportData = data.result;
    const amountData = reportData?.[0].month;
    const hasStore = reportData?.[0].store;
    const months = amountData ? Object.keys(amountData) : [];
    const columns = ['Channel', ...(hasStore ? ['Store'] : []), ...months];

    if (!reportData || !Array.isArray(reportData)) {
        return <NoDataMsg className="table" msg="No data available" />;
    }

    if (!data) {
        return <NoDataMsg className="table" msg="Please choose the condition" />;
    }

    const logoImg = {
        Amazon: '/amazon_logo.png',
        Shopify: '/shopify_icon.png',
        Tiktokshop: '/tiktokshop_icon.png',
    };
    const ChannelLogo = ({ channel }) => {
        const logoPath = logoImg[channel];
        if (logoPath) {
            return <img src={logoPath} alt={`${channel} Logo`} />;
        } else {
            return <span>{channel}</span>;
        }
    };

    // const handleRowClick = (rowData) => {
    //     console.log("Clicked row data:", rowData);
    // };

    return (
        <div className="content_container">
            <div className="color_ex">
                <div className="ex_item ex_orders">Orders</div>
                <div className="ex_item ex_payment">Sales</div>
                <div className="ex_item ex_netIncome">Net Income</div>
            </div>
            <div className="table_responsive table_content">
                <div className="monthly_amount_table_wrap">
                    <table className="monthly_amount_table">
                        <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column} className={`monthly_amount_${column}`} >{column}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                            {reportData.map((rowData, index) => (
                                <tr key={index}>
                                    <td>
                                        {rowData.month && <ChannelLogo channel={rowData.channel} />}
                                    </td>
                                    {hasStore ? (
                                        <td className="monthly_amount_Store">{rowData.store}</td>
                                    ) : null}
                                    {months.map((column) => (
                                        <td key={column}>
                                            <div className="monthly_type_all">
                                                <span className="seller_monthly_order">{formatNumber(rowData.month[column].orders)}</span>
                                                <span className="seller_monthly_payment">{formatNumber(rowData.month[column].sales_total.amount)} {rowData.month[column].sales_total.currency}</span>
                                                <span className="seller_monthly_netIncome">{formatNumber(rowData.month[column].net_income_total.amount)} {rowData.month[column].net_income_total.currency}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonthlyAmountTable;