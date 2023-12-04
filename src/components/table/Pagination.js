import React from 'react';
import Button from "../button/Button";

export const Pagination = ({ currentPage, handlePageChange, lastPage }) => {
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 10) * 10;
        return new Array(Math.min(10, lastPage - start)).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <>
                    <Button type="button" className="pagination_btn" label="First" onClick={() => handlePageChange(1)} />
                    <Button type="button" className="pagination_btn" label="Previous" onClick={() => handlePageChange(currentPage - 1)} />
                </>
            )}
            {getPaginationGroup().map((item) => (
                <Button type="button"
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={currentPage === item ? "paginationActiveBtn" : "pagination_btn"}
                    label={item.toString()}
                />
            ))}
            {currentPage < lastPage && (
                <>
                    <Button type="button" className="pagination_btn" label="Next" onClick={() => handlePageChange(currentPage + 1)} />
                    <Button type="button" className="pagination_btn" label="Last" onClick={() => handlePageChange(lastPage)} />
                </>
            )}
        </div>
    );
};

export default Pagination;