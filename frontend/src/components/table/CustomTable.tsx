import React, { useState } from 'react';
import { useTable, Column } from 'react-table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface CustomTableProps<T extends object> {
    columns: Column<T>[];
    data: T[];
    getExpandedContent?: (row: T) => React.ReactNode;
}

const CustomTable = <T extends object>({ columns, data, getExpandedContent }: CustomTableProps<T>) => {
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (rowIndex: number) => {
        if (!getExpandedContent) return;
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(rowIndex)) {
            newExpandedRows.delete(rowIndex);
        } else {
            newExpandedRows.add(rowIndex);
        }
        setExpandedRows(newExpandedRows);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<T>({ columns, data });

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontSize: '14px', fontWeight: 'bold' }} />
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    padding: '16px',
                                    textAlign: 'left',
                                    borderBottom: '2px solid #e0e0e0',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    const isExpanded = expandedRows.has(i);
                    const canExpand = getExpandedContent ? !!getExpandedContent(row.original) : false;
                    return (
                        <React.Fragment key={row.id}>
                            <tr {...row.getRowProps()} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                                <td
                                    style={{
                                        padding: '16px',
                                        borderBottom: '1px solid #e0e0e0',
                                        fontSize: '14px',
                                        cursor: canExpand ? 'pointer' : 'default',
                                    }}
                                    onClick={() => canExpand && toggleRow(i)}
                                >
                                    {canExpand ? (isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />) : null}
                                </td>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '16px',
                                            borderBottom: '1px solid #e0e0e0',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                            {isExpanded && getExpandedContent && (
                                <tr>
                                    <td colSpan={row.cells.length + 1} style={{ padding: '16px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}>
                                        {getExpandedContent(row.original)}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
