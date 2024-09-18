import React from "react";

const DynamicTable = ({ columns, data, getRowClass, dynamicHeaders }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                colSpan={column.colSpan || 1}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                    {dynamicHeaders && (
                        <tr>
                            {dynamicHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={getRowClass(row)}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                >
                                    {column.accessor
                                        ? row[column.accessor]
                                        : ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
