import React, {useMemo, useState} from 'react';
import {BiCaretUp, BiCaretDown} from "react-icons/bi";
import NoDataMsg from "../NoDataMsg";
import {formatNumber} from "../../utill/FormatNumber";

/**
 * Daily Report 테이블 컴포넌트는 API 2개를 호출하여 데이터를 받아옴 (Amount, Total)
 * value 값들은 전부 String 으로 받아오기 때문에 정렬 기능을 사용하기 위해 숫자로 변환하여 정렬 기능을 동작하게 함
 */

const DailyReportTable = ({reportData}) => {
    const amountData = reportData?.data?.result;
    const totalData = reportData?.total?.result;

    // 마우스오버 효과와 정렬 설정을 위한 상태값
    const [hoverIndexForSales, setHoverIndexForSales] = useState(null);
    const [hoverIndexForNetIncome, setHoverIndexForNetIncome] = useState(null);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

    // 정렬 기준에 따라 정렬된 데이터를 반환하는데 현재 리스폰스 값을 다 String으로 받고있어서 숫자로 변환하여 정렬 기능 동작 변환안하면 ','나 '.' 을 체크 하지 못함
    const sortedData = useMemo(() => {
        if (!amountData || amountData.length === 0 || sortConfig.direction === 'none') {
            return amountData;
        }

        return [...amountData].sort((a, b) => {
            if (sortConfig.key === 'sales' || sortConfig.key === 'net_income') {
                const valueA = a[sortConfig.key].find(currency => currency.currency === "USD")?.amount || 0;
                const valueB = b[sortConfig.key].find(currency => currency.currency === "USD")?.amount || 0;
                return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
            } else if (sortConfig.key === 'order_count') {
                // order_count 또한 이미 숫자일 것으로 가정
                const valueA = a[sortConfig.key];
                const valueB = b[sortConfig.key];
                return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
            } else {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        });
    }, [amountData, sortConfig]);

    // props 전달 받은 데이터가 없을 때 표시함
    if (!amountData || amountData.length === 0 || !totalData || totalData.length === 0) {
        return <NoDataMsg className="table" msg="No data you're trying to find. Please check the requirements"/>;
    }

    // 테이블 정렬 기능
    const requestSort = (key) => {
        let direction = 'descending';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        }

        setSortConfig({key: direction !== 'none' ? key : null, direction});
    };

    // 테이블 정렬 아이콘 컴포넌트
    const SortIcon = ({columnKey}) => (
        <div className="sort_icon_box">
            <BiCaretUp className={`sort_icon ${getSortIconClasses(columnKey, 'ascending')}`}/>
            <BiCaretDown className={`sort_icon ${getSortIconClasses(columnKey, 'descending')}`}/>
        </div>
    );

    // 테이블 정렬 아이콘 클래스 결정 함수
    const getSortIconClasses = (key, direction) => (
        sortConfig.key === key && sortConfig.direction === direction ? 'active' : ''
    );

    // props 전달 받은 채널명을 이미지로 변환하는 함수
    const renderLogo = (channel) => {
        switch (channel) {
            case 'Amazon':
                return <img src="/amazon_logo.png" alt="Amazon Logo" title="Amazon Logo"/>;
            case 'Shopify':
                return <img src="/shopify_icon.png" alt="Shopify Logo" title="Shopify Logo"/>;
            case 'Tiktokshop':
                return <img src="/tiktokshop_icon.png" alt="TiktokShop Logo" title="TiktokShop Logo"/>;
            default:
                return channel;
        }
    };

    // 첫 번째 요소를 제외한 모든 요소가 0인지 확인하는 함수
    const isAllAmountsZero = (currencies) => {
        return currencies.slice(1).every(currency => currency.amount === 0);
    };

    // 마우스 오버했을 때 나머지 화폐 단위들 렌더링 함수
    const renderCurrenciesPopover = (currencies, index, type) => {
        const isHovered = type === 'sales' ? hoverIndexForSales === index : hoverIndexForNetIncome === index;

        if (!Array.isArray(currencies) || currencies.length === 0) {
            return null;
        }

        return (
            <div className={`currencies_popover ${type}`}
                 style={{display: isHovered ? 'block' : 'none'}}>
                {currencies.map((currency, idx) => {
                    if (currency.amount === 0) {
                        return null;
                    }
                    return (
                        <div key={idx}>{`${formatNumber(currency.amount)} ${currency.currency}`}</div>
                    );
                })}
            </div>
        );
    };

    // 화폐 단위 렌더링 함수
    const renderCurrency = (currencies) => {
        if (!currencies || currencies.length === 0) {
            return 0.00;
        }

        const firstCurrency = currencies[0];
        // firstCurrency가 유효한 객체인지 확인
        if (!firstCurrency || !firstCurrency.amount || !firstCurrency.currency) {
            return 0.00;
        }

        return `${formatNumber(firstCurrency.amount)} ${firstCurrency.currency}`;
    };

    // 테이블 행 렌더링 함수
    const renderTableRows = sortedData.map((item, index) => {
        const allSalesAmountsZero = isAllAmountsZero(item.sales);
        const allNetIncomeAmountsZero = isAllAmountsZero(item.net_income);

        return (
            <tr key={index}>
                <td><span>{item.date}</span></td>
                <td><span>{renderLogo(item.channel)}</span></td>
                {item.store && <td className="store_sell"><span>{item.store}</span></td>}
                <td><span>{formatNumber(item.order_count)}</span></td>
                <td>
                    <span
                        onMouseEnter={() => !allSalesAmountsZero && setHoverIndexForSales(index)}
                        onMouseLeave={() => setHoverIndexForSales(null)}
                    >
                        {renderCurrency(item.sales)}
                        {!allSalesAmountsZero && renderCurrenciesPopover(item.sales, index, 'sales')}
                    </span>
                </td>
                <td>
                    <span
                        onMouseEnter={() => !allNetIncomeAmountsZero && setHoverIndexForNetIncome(index)}
                        onMouseLeave={() => setHoverIndexForNetIncome(null)}
                    >
                        {renderCurrency(item.net_income)}
                        {!allNetIncomeAmountsZero && renderCurrenciesPopover(item.net_income, index, 'netIncome')}
                    </span>
                </td>
            </tr>
        );
    });

    // 테이블 총계 행 렌더링 함수
    const renderTotalRow = () => {
        if (!totalData) return null;

        const allTotalSalesAmountsZero = isAllAmountsZero(totalData.sales);
        const allTotalNetIncomeAmountsZero = isAllAmountsZero(totalData.net_income);

        return (
            <tr>
                <td><span>Total</span></td>
                <td><span>{totalData.channel}</span></td>
                {totalData.store && <td className="store_sell"><span>{totalData.store}</span></td>}
                <td><span>{formatNumber(totalData.order_count)}</span></td>
                <td>
                    <span
                        onMouseEnter={() => !allTotalSalesAmountsZero && setHoverIndexForSales(-1)}
                        onMouseLeave={() => setHoverIndexForSales(null)}
                    >
                        {renderCurrency(totalData.sales)}
                        {!allTotalSalesAmountsZero && renderCurrenciesPopover(totalData.sales, -1, 'sales')}
                    </span>
                </td>
                <td>
                    <span
                        onMouseEnter={() => !allTotalNetIncomeAmountsZero && setHoverIndexForNetIncome(-1)}
                        onMouseLeave={() => setHoverIndexForNetIncome(null)}
                    >
                        {renderCurrency(totalData.net_income)}
                        {!allTotalNetIncomeAmountsZero && renderCurrenciesPopover(totalData.net_income, -1, 'netIncome')}
                    </span>
                </td>
            </tr>
        );
    };

    return (
        <div className="content_container">
            <div className="table_responsive table_content daily_report">
                <table className="daily_report_table pagination_table">
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('date')}>
                            <div className="th_wrap">
                                <span>Date</span>
                                <SortIcon columnKey="date"/>
                            </div>
                        </th>
                        <th>Channel</th>
                        {amountData.some(data => data.store) && totalData.store && (
                            <th className="store_sell"
                                onClick={
                                    amountData.some(data => data.store && data.store !== 'Total')
                                        ? () => requestSort('store')
                                        : undefined
                                }>
                                <div className="th_wrap">
                                    <span>Store</span>
                                    {amountData.some(data => data.store && data.store !== 'Total') &&
                                        <SortIcon columnKey="store"/>}
                                </div>
                            </th>
                        )}
                        <th onClick={() => requestSort('order_count')}>
                            <div className="th_wrap">
                                <span>Orders</span>
                                <SortIcon columnKey="order_count"/>
                            </div>
                        </th>
                        <th onClick={() => requestSort('sales')}>
                            <div className="th_wrap">
                                <span>Sales</span>
                                <SortIcon columnKey="sales"/>
                            </div>
                        </th>
                        <th onClick={() => requestSort('net_income')}>
                            <div className="th_wrap">
                                <span>Net Income</span>
                                <SortIcon columnKey="net_income"/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="scrollable_tbody">{renderTableRows}</tbody>
                    <tfoot>{renderTotalRow()}</tfoot>
                </table>
            </div>
        </div>
    );
};

export default DailyReportTable;