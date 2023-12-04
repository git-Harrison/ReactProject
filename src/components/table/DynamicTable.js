import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from "prop-types";
import {CgChevronLeft, CgPushChevronLeft, CgChevronRight, CgPushChevronRight} from 'react-icons/cg';
import {PiCaretUpBold, PiCaretDownBold, PiCaretUpDownBold} from "react-icons/pi";
import {useTable, usePagination, useSortBy} from 'react-table';
import Select from '../select/BasicSelect';
import Information from "../button/Information";

function DynamicTable(props) {
    const {columns, data, dataTotal, defaultPageSize, pageMode} = props;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const determinePageSize = () => {
        if (isMobile) return data.length;
        if (pageMode === 'daily') return data.length;
        return defaultPageSize || 20;
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize, sortBy},
    } = useTable(
        {
            columns,
            data,
            dataTotal,
            initialState: {
                pageIndex: 0,
                pageSize: determinePageSize(),
                sortBy: [{id: "defaultColumnId", desc: true}],
            },
            manualSorting: true,
        },
        useSortBy,
        usePagination
    );

    const pageSizeOptions = [
        {key: '5', value: '5'},
        {key: '10', value: '10'},
        {key: '20', value: '20'},
    ];

    const formatCellValue = (columnId, value) => {
        // const numericRegex = /^-?\d+(\.\d+)?$/; // 숫자 형식을 나타내는 정규식
        //
        // if (typeof value === 'string' && numericRegex.test(value)) {
        //     const numericValue = parseFloat(value);
        //     if (!isNaN(numericValue)) {
        //         value = numericValue.toLocaleString();
        //         return formatDisplayValue(columnId, value);
        //     }
        // }

        value = value != null ? value.toLocaleString() : '-';

        return formatDisplayValue(columnId, value);
    };

    const formatDisplayValue = (accessor, value) => {
        switch (accessor) {
            case 'payment_shipped':
            case 'payment_unshipped':
            case 'order_amount_shipped':
            case 'order_amount_unshipped':
            case 'netIncome':
                return `$ ${value}`;
            case 'orders_shipped':
            case 'orders_unshipped':
            case 'order_count_shipped':
            case 'order_count_unshipped':
                return `${value} 건`;
            case 'item_quantity_shipped':
            case 'item_quantity_unshipped':
                return `${value} 개`;
            default:
                return value;
        }
    };

    return (
        <div className={
            `content_container ${pageMode === 'main' ? 'main_table' : (pageMode === 'monthly' && data[0].store !== undefined ? 'monthly_amount_store_table' : '')}`
        }>
            {pageMode === 'monthly' && (
                <div className="color_ex">
                    <div className="ex_item ex_orders">Orders</div>
                    <div className="ex_item ex_payment">Payment</div>
                    <div className="ex_item ex_netIncome">Net Income</div>
                </div>
            )}
            <div className="table_responsive table_content">
                <table {...getTableProps()} className="dynamic_table">
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => {
                                const monthsToDisableSortBy = ['Channel', 'Store', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                const disableSortBy = monthsToDisableSortBy.includes(column.Header) || pageMode === "main";

                                return (
                                    <th
                                        {...column.getHeaderProps()}
                                        onClick={() => {
                                            if (!disableSortBy) {
                                                if (column.isSorted) {
                                                    column.toggleSortBy(!column.isSortedDesc, false);
                                                } else {
                                                    column.toggleSortBy(true, false);
                                                }
                                            }
                                        }}
                                        className={pageMode === 'main' ? 'main_tt' : ''}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {!disableSortBy && (
                                                column.isSorted
                                                    ? (column.isSortedDesc ? <PiCaretUpBold/> : <PiCaretDownBold/>)
                                                    : <PiCaretDownBold/>
                                            )}
                                        </span>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, i) => {
                                    let cellValue = formatCellValue(cell.column.id, cell.value);
                                    const cellProps = cell.getCellProps();
                                    const className = `${i === 0 ? 'first' : ''} ${pageMode === 'main' ? 'main_tt' : ''}`;

                                    if (pageMode === 'monthly') {
                                        return (
                                            <td {...cellProps} className={className}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    } else if (pageMode === 'monthlySeller') {
                                        return (
                                            <td {...cellProps} className={className}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td {...cellProps} className={className}>
                                                {cellValue === 'Amazon' ? (
                                                    <img
                                                        src="/amazon_logo.png"
                                                        alt="Amazon Logo"
                                                        className="table_logo"
                                                    />
                                                ): cellValue === 'Shopify' ? (
                                                    <img
                                                        src="/shopify_icon.png"
                                                        alt="shopify Logo"
                                                        className="table_logo"
                                                    />
                                                ): cellValue === 'Tiktokshop' ? (
                                                    <img
                                                        src="/tiktokshop_icon.png"
                                                        alt="TiktokShop Logo"
                                                        className="table_logo"
                                                    />
                                                ) : (
                                                    cellValue
                                                )}
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                    { (pageMode === 'main' || pageMode === 'daily') && (
                        <tr>
                            {headerGroups[0].headers.map((column, index) => {
                                if (index === 0) {
                                    return <td key="totalLabel">Total</td>;
                                }
                                if (column.id !== '-') {
                                    let value = dataTotal[0][column.id];
                                    if (value !== undefined) {
                                        let formattedValue = formatCellValue(column.id, value);
                                        return <td key={column.id}>{formattedValue}</td>;
                                    } else {
                                        return <td key={column.id}>-</td>;
                                    }
                                }
                                return <td key="empty">-</td>;
                            })}
                        </tr>
                    )}
                    </tfoot>
                </table>
            </div>
            {data.length > 5 && !isMobile || pageMode === "main" && (
                <div className="pagination_btn_wrap">
                    <div className="page_info_wrap">
                        <span className="page_info mr-8">Items per page:</span>
                        <Select
                            title={pageSize.toString()}
                            option={pageSizeOptions}
                            onSelectChange={(key, value) => setPageSize(Number(value))}
                        />
                    </div>
                    <span
                        className="page_info">Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>
                    <button type="button" className="pagination_btn" onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}>
                        <CgPushChevronLeft/>
                    </button>
                    <button type="button" className="pagination_btn" onClick={() => previousPage()}
                            disabled={!canPreviousPage}>
                        <CgChevronLeft/>
                    </button>
                    <button type="button" className="pagination_btn" onClick={() => nextPage()} disabled={!canNextPage}>
                        <CgChevronRight/>
                    </button>
                    <button type="button" className="pagination_btn" onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}>
                        <CgPushChevronRight/>
                    </button>
                </div>
            )}
        </div>
    );
}

DynamicTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    dataTotal: PropTypes.array,
    defaultPageSize: PropTypes.number,
    pageMode: PropTypes.string
};

export default DynamicTable;