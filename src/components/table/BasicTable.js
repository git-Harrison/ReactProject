import React from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';

function BasicTable(props) {
    const { columns, data } = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = useTable(
        {
            columns,
            data,
        },
    );

    return (
        <>
            <div className="content_container">
                <div className="table_responsive table_content">
                    <table {...getTableProps()} className="basic_table">
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

BasicTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};

export default BasicTable;