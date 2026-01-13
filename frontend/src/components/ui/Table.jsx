import React from 'react';
import './Table.css';

export const Table = ({ columns, data, actions }) => {
    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-slate-500">No data available</div>;
    }

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key || col.header}>{col.header}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={row.id || idx}>
                            {columns.map((col) => (
                                <td key={`${row.id || idx}-${col.key}`}>
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td>
                                    <div className="table-actions">
                                        {actions(row)}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
