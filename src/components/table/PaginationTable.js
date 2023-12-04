import React, {useState} from 'react';
import PropTypes from "prop-types";

const ITEMS_PER_PAGE = 20;
const MAX_PAGE_NUMBERS = 10;

const PaginationTable = (props) => {
    const {data, lastPage, fetchData, currentPage} = props;

    const [pageGroup, setPageGroup] = useState(1);

    const handlePrevPage = () => {
        fetchData(Math.max(currentPage - 1, 1));
        if (currentPage % MAX_PAGE_NUMBERS === 1) setPageGroup(pageGroup - 1);
    };

    const handleNextPage = () => {
        fetchData(Math.min(currentPage + 1, lastPage));
        if (currentPage % MAX_PAGE_NUMBERS === 0) setPageGroup(pageGroup + 1);
    };

    const handlePageChange = (page) => {
        const newPage = Math.max(1, Math.min(page, lastPage));
        fetchData(newPage);
        const newPageGroup = Math.ceil(newPage / MAX_PAGE_NUMBERS);
        if (newPageGroup !== pageGroup) {
            const startPage = (newPageGroup - 1) * MAX_PAGE_NUMBERS + 1;
            setPageGroup(startPage < 1 ? 1 : newPageGroup);
        }
    };
    const middleIndex = Math.floor(MAX_PAGE_NUMBERS / 5);
    const endPage = Math.min(currentPage + Math.floor(MAX_PAGE_NUMBERS / 2), lastPage);
    const startPage = Math.max(1, endPage - MAX_PAGE_NUMBERS + 1);

    return (
        <div className="content_container">
            <div className="table_responsive table_content">
                <div className="pagination_table_wrap">
                    <table className="pagination_table">
                        <thead>
                        <tr>
                            <th>Amazon Order Id</th>
                            <th>Store</th>
                            <th>Status</th>
                            <th>Purchase Date (UTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <td>{order.amazon_order_id}</td>
                                <td>{order.details.store}</td>
                                <td>{order.details.order_status}</td>
                                <td>{order.details.purchase_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {lastPage > 1 && (
                    <div className="pagination">
                        <div className="pagination_arrow">
                            <button type="button" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                                First
                            </button>
                            <button type="button" onClick={handlePrevPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                        </div>
                        <div className="pagination_index">
                            {startPage > 1 && <button type="button" onClick={() => handlePageChange(startPage - 1)}>...</button>}
                            {Array.from({length: Math.max(0, endPage - startPage + 1)}, (_, index) => (
                                <button
                                    type="button"
                                    key={index + startPage}
                                    onClick={() => handlePageChange(index + startPage)}
                                    className={currentPage === index + startPage ? 'paginationActiveBtn' : ''}
                                >
                                    {index + startPage}
                                </button>
                            ))}
                            {endPage < lastPage && <button type="button" onClick={() => handlePageChange(endPage + 1)}>...</button>}
                        </div>
                        <div className="pagination_arrow">
                            <button type="button" onClick={handleNextPage} disabled={currentPage === lastPage}>
                                Next
                            </button>
                            <button type="button" onClick={() => handlePageChange(lastPage)} disabled={currentPage === lastPage}>
                                Last
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

PaginationTable.propTypes = {
    data: PropTypes.array.isRequired,
    lastPage: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default PaginationTable;