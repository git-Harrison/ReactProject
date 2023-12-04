import React from 'react';
import PropTypes from "prop-types";
import NoDataMsg from "../NoDataMsg";

const MonthlySellerTable = (props) => {
    const { data } = props;
    if (!data[0] || !data[0].FBA || !data[0].FBM) {
        return <NoDataMsg className="table" msg="Please choose the condition" />;
    }

    const { FBA, FBM } = data[0];

    const hasStore = data[0]?.FBA[0]?.store;

    const renderRow = (rowData, label) => {
        return (
            <tr key={label}>
                <td>{label}</td>
                {hasStore ? (
                    <td>{rowData.store}</td>
                ) : null}
                {Object.keys(rowData).slice(hasStore ? 1 : 0).map(month => (
                    <td key={month}>
                        <div className="seller_table_monthly">
                            <div className="seller_monthly_cell">
                                <span className="seller_monthly_order">{Number(rowData[month].orders).toLocaleString()}</span>
                                <span className="seller_monthly_order_ratio">({rowData[month].order_ratio}%)</span>
                            </div>
                            <div className="seller_monthly_cell">
                                <span className="seller_monthly_payment">{Number(rowData[month].payment).toLocaleString()}</span>
                                <span className="seller_monthly_payment_ratio">({rowData[month].payment_ratio}%)</span>
                            </div>
                            {/*<div className="seller_monthly_cell">*/}
                            {/*    <span className="seller_monthly_netIncome">{Number(rowData[month].netIncome).toLocaleString()}</span>*/}
                            {/*    <span className="seller_monthly_netIncome_ratio">({rowData[month].netIncome_ratio}%)</span>*/}
                            {/*</div>*/}
                        </div>
                    </td>
                ))}
            </tr>
        );
    };


    return (
        <div className="content_container">
            <div className="color_ex">
                <div className="ex_item ex_orders">Orders</div>
                <div className="ex_item ex_payment">Payment</div>
                {/*<div className="ex_item ex_netIncome">Net Income</div>*/}
            </div>
            <div className="table_responsive table_content">
                <div className="seller_table_wrap">
                    <table className="seller_table">
                        <thead>
                        <tr>
                            <th>Seller</th>
                            {hasStore && <th>Store</th>}
                            <th>Jan</th>
                            <th>Feb</th>
                            <th>Mar</th>
                            <th>Apr</th>
                            <th>May</th>
                            <th>Jun</th>
                            <th>Jul</th>
                            <th>Aug</th>
                            <th>Sep</th>
                            <th>Oct</th>
                            <th>Nov</th>
                            <th>Dec</th>
                        </tr>
                        </thead>
                        <tbody>
                        {FBA.map(seller => renderRow(seller, 'FBA'))}
                        {FBM.map(seller => renderRow(seller, 'FBM'))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

MonthlySellerTable.propTypes = {
    data: PropTypes.array.isRequired
};

export default MonthlySellerTable;