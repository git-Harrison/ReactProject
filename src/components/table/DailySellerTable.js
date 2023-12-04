import React from 'react';
import PropTypes from 'prop-types';
import NoDataMsg from '../NoDataMsg';

const DailySellerTable = ({ data }) => {
    const amountData = data.amount || [];
    const totalData = data.total || {};

    return (
        <div className="content_container">
            <div className="table_responsive table_content">
                <div className="pagination_table_wrap">
                    <table className="pagination_table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Store</th>
                            <th>Inventory</th>
                            <th>Order Qty(ship O)</th>
                            <th>Order Qty(ship X)</th>
                            <th>GMV(ship O)</th>
                            <th>GMV(ship X)</th>
                            <th>netIncome</th>
                        </tr>
                        </thead>
                        <tbody>
                        {amountData.length === 0 ? (
                            <NoDataMsg />
                        ) : (
                            amountData.map((dayData, index) => {
                                return dayData.stores.map((store, subIndex) => {
                                    return (
                                        <tr key={`${index}-${subIndex}`}>
                                            <td>{dayData.date}</td>
                                            <td className="half_store">{store.storeName}</td>
                                            <td className="half_td fb">
                                                <div className="half_data">FBA</div>
                                                <div className="half_data">FBM</div>
                                            </td>
                                            <td className="half_td">
                                                <div className="half_data">{store.FBA[0].orders_shipped}</div>
                                                <div className="half_data">{store.FBM[0].orders_shipped}</div>
                                            </td>
                                            <td className="half_td">
                                                <div className="half_data">{store.FBA[0].orders_unshipped}</div>
                                                <div className="half_data">{store.FBM[0].orders_unshipped}</div>
                                            </td>
                                            <td className="half_td">
                                                <div className="half_data">{store.FBA[0].payment_shipped}</div>
                                                <div className="half_data">{store.FBM[0].payment_shipped}</div>
                                            </td>
                                            <td className="half_td">
                                                <div className="half_data">{store.FBA[0].payment_unshipped}</div>
                                                <div className="half_data">{store.FBM[0].payment_unshipped}</div>
                                            </td>
                                            <td className="half_td">
                                                <div className="half_data">{store.FBA[0].netIncome}</div>
                                                <div className="half_data">{store.FBM[0].netIncome}</div>
                                            </td>
                                        </tr>
                                    );
                                });
                            })
                        )}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3">Total</td>
                            <td>{totalData.orders_shipped}</td>
                            <td>{totalData.orders_unshipped}</td>
                            <td>{totalData.payment_shipped}</td>
                            <td>{totalData.payment_unshipped}</td>
                            <td>{totalData.netIncome}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

DailySellerTable.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DailySellerTable;