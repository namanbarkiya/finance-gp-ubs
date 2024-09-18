import React, { useState, useEffect } from "react";

const MultilateralNettingReport = ({ trades }) => {
    const [report, setReport] = useState([]);
    const [uniqueShares, setUniqueShares] = useState([]);

    useEffect(() => {
        const balances = {};
        const sharesSet = new Set();

        trades.forEach((trade) => {
            const { memberA, memberB, company, shares, price } = trade;
            const totalAmount = shares * price;

            // Add company to unique shares set
            sharesSet.add(company);

            // Member A (buyer) loses funds, gains shares
            if (!balances[memberA]) {
                balances[memberA] = { funds: 0, shares: {} };
            }
            balances[memberA].funds -= totalAmount; // Deduct funds
            balances[memberA].shares[company] =
                (balances[memberA].shares[company] || 0) + shares; // Add shares

            // Member B (seller) gains funds, loses shares
            if (!balances[memberB]) {
                balances[memberB] = { funds: 0, shares: {} };
            }
            balances[memberB].funds += totalAmount; // Add funds
            balances[memberB].shares[company] =
                (balances[memberB].shares[company] || 0) - shares; // Deduct shares
        });

        // Convert balances to a report array
        const reportData = Object.entries(balances).map(
            ([member, { funds, shares }]) => ({
                member,
                funds,
                shares,
            })
        );

        setReport(reportData);
        setUniqueShares([...sharesSet]);
    }, [trades]);

    const columns = [
        { header: "Clearing Member", accessor: "member" },
        { header: "Net Funds", accessor: "funds" },
        ...uniqueShares.map((share, index) => ({
            header: `${share} Shares`,
            accessor: `shares.${share}`,
        })),
    ];

    return (
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border mt-5">
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Clearing Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Net Funds
                    </th>
                    {uniqueShares.map((share, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                        >
                            {share} Shares
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {report.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {row.member}
                        </td>
                        <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                                row.funds >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {row.funds >= 0 ? `+${row.funds}` : row.funds}
                        </td>
                        {uniqueShares.map((share) => (
                            <td
                                key={share}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {row.shares[share] || 0}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MultilateralNettingReport;
