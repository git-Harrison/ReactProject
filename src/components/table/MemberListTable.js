import React, {useState, useMemo} from "react";
import {BiCaretUp, BiCaretDown} from "react-icons/bi";
import {BsCheckLg, BsXLg} from "react-icons/bs";
import Pagination from "../table/Pagination";

const grantNames = {
    1: '최고 관리자',
    2: '관리자',
    3: '사용자',
    null: '승인 대기중',
};

export const MemberListTable = ({
                                    data,
                                    handleApprovalBtnClick,
                                    handleRejectBtnClick,
                                    pageMode,
                                    currentPage,
                                    lastPage,
                                    handlePageChange,
                                }) => {
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

    const sortedData = useMemo(() => {
        if (!sortConfig.key || sortConfig.direction === 'none') return [...data];

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'none';
        }
        setSortConfig({key: direction !== 'none' ? key : null, direction});
    };

    const SortIcon = ({columnKey}) => (
        <div className="sort_icon_box">
            <BiCaretUp className={`sort_icon ${getSortIconClasses(columnKey, 'ascending')}`}/>
            <BiCaretDown className={`sort_icon ${getSortIconClasses(columnKey, 'descending')}`}/>
        </div>
    );

    const getSortIconClasses = (key, direction) => (
        sortConfig.key === key && sortConfig.direction === direction ? 'active' : ''
    );

    const renderActionColumn = (item) => (
        <td className="signup_approval_action">
            <BsCheckLg className="approval_icon" title="Permission" onClick={() => handleApprovalBtnClick(item.id)}/>
            <BsXLg className="reject_icon" title="Refuse" onClick={() => handleRejectBtnClick(item.id)}/>
        </td>
    );

    return (
        <div className="content_container">
            <div className="table_responsive table_content">
                <div className="pagination_table_wrap">
                    <table className="pagination_table">
                        <thead>
                        <tr>
                            <th onClick={() => requestSort('id')}>
                                Id <SortIcon columnKey='id'/>
                            </th>
                            <th onClick={() => requestSort('name')}>
                                Name <SortIcon columnKey='name'/>
                            </th>
                            <th>Branch</th>
                            <th>Department</th>
                            <th>Team</th>
                            <th>Position</th>
                            <th>Grant</th>
                            {pageMode === 'list' && <th>Action</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.branch}</td>
                                <td>{item.department}</td>
                                <td>{item.team}</td>
                                <td>{item.position}</td>
                                <td>{grantNames[item.grant] || ''}</td>
                                {pageMode === 'list' && renderActionColumn(item)}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {lastPage > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        lastPage={lastPage}
                    />
                )}
            </div>
        </div>
    );
};

export default MemberListTable;