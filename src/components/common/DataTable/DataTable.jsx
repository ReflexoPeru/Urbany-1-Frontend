import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import Pagination from '../Pagination';
import styles from './DataTable.module.css';

const DataTable = ({
    data = [],
    columns = [],
    onRowClick,
    className = '',
    showPagination = true,
    pageSize = 10,
    rowSelection = {},
    onSelectionChange,
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: onSelectionChange,
        state: {
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
    });

    return (
        <div className={`${styles.tableWrapper} ${className}`}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className={styles.headerRow}>
                                {headerGroup.headers.map(header => {
                                    const isSelectColumn = header.id === 'select';
                                    return (
                                        <th
                                            key={header.id}
                                            className={`${styles.headerCell} ${isSelectColumn ? styles.headerCellCenter : ''}`}
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{
                                                cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                            }}
                                        >
                                            <div className={`${styles.headerContent} ${isSelectColumn ? styles.headerContentCenter : ''}`}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() === 'asc' && (
                                                    <span className={styles.sortIcon}>↑</span>
                                                )}
                                                {header.column.getIsSorted() === 'desc' && (
                                                    <span className={styles.sortIcon}>↓</span>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={styles.tableBody}>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className={styles.dataRow}
                                onClick={() => onRowClick?.(row.original)}
                            >
                                {row.getVisibleCells().map(cell => {
                                    const isSelectColumn = cell.column.id === 'select';
                                    return (
                                        <td
                                            key={cell.id}
                                            className={`${styles.dataCell} ${isSelectColumn ? styles.dataCellCenter : ''}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPagination && (
                <Pagination
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    totalItems={table.getFilteredRowModel().rows.length}
                    itemsPerPage={pageSize}
                    onPageChange={(page) => table.setPageIndex(page - 1)}
                    showInfo={true}
                    showPageNumbers={true}
                    maxVisiblePages={5}
                />
            )}
        </div>
    );
};

export default DataTable;
