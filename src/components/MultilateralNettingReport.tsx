// import React, { useState, useEffect } from "react";

// const MultilateralNettingReport = ({ trades }) => {
//     const [report, setReport] = useState([]);
//     const [uniqueShares, setUniqueShares] = useState([]);

//     useEffect(() => {
//         const balances = {};
//         const sharesSet = new Set();

//         trades.forEach((trade) => {
//             const { memberA, memberB, company, shares, price } = trade;
//             const totalAmount = shares * price;

//             // Add company to unique shares set
//             sharesSet.add(company);

//             // Member A (buyer) loses funds, gains shares
//             if (!balances[memberA]) {
//                 balances[memberA] = { funds: 0, shares: {} };
//             }
//             balances[memberA].funds -= totalAmount; // Deduct funds
//             balances[memberA].shares[company] =
//                 (balances[memberA].shares[company] || 0) + shares; // Add shares

//             // Member B (seller) gains funds, loses shares
//             if (!balances[memberB]) {
//                 balances[memberB] = { funds: 0, shares: {} };
//             }
//             balances[memberB].funds += totalAmount; // Add funds
//             balances[memberB].shares[company] =
//                 (balances[memberB].shares[company] || 0) - shares; // Deduct shares
//         });

//         // Convert balances to a report array
//         const reportData = Object.entries(balances).map(
//             ([member, { funds, shares }]) => ({
//                 member,
//                 funds,
//                 shares,
//             })
//         );

//         setReport(reportData);
//         setUniqueShares([...sharesSet]);
//     }, [trades]);

//     const columns = [
//         { header: "Clearing Member", accessor: "member" },
//         { header: "Net Funds", accessor: "funds" },
//         ...uniqueShares.map((share, index) => ({
//             header: `${share} Shares`,
//             accessor: `shares.${share}`,
//         })),
//     ];

//     return (
//         <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border mt-5">
//             <thead className="bg-gray-200">
//                 <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                         Clearing Member
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                         Net Funds
//                     </th>
//                     {uniqueShares.map((share, index) => (
//                         <th
//                             key={index}
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
//                         >
//                             {share} Shares
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//                 {report.map((row, index) => (
//                     <tr key={index} className="hover:bg-gray-100">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                             {row.member}
//                         </td>
//                         <td
//                             className={`px-6 py-4 whitespace-nowrap text-sm ${
//                                 row.funds >= 0
//                                     ? "text-green-600"
//                                     : "text-red-600"
//                             }`}
//                         >
//                             {row.funds >= 0 ? `+${row.funds}` : row.funds}
//                         </td>
//                         {uniqueShares.map((share) => (
//                             <td
//                                 key={share}
//                                 className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
//                             >
//                                 {row.shares[share] || 0}
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default MultilateralNettingReport;

import React, { useState, useEffect } from "react";

const MultilateralNettingReport = ({ trades }) => {
    const [report, setReport] = useState([]);
    const [uniqueShares, setUniqueShares] = useState([]);
    const [settlements, setSettlements] = useState([]);

    useEffect(() => {
        const balances = {};
        const sharesSet = new Set();

        // Loop through trades to calculate net funds and shares for each member
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

        // Settle funds and shares
        const settlementInstructions = settleBalancesAndShares(balances);
        setSettlements(settlementInstructions);
    }, [trades]);

    // Function to settle funds and shares between members
    const settleBalancesAndShares = (balances) => {
        const payers = [];
        const receivers = [];

        // Separate payers and receivers
        for (const [member, { funds, shares }] of Object.entries(balances)) {
            if (funds < 0) {
                payers.push({ member, amount: -funds, shares });
            } else if (funds > 0) {
                receivers.push({ member, amount: funds, shares });
            }
        }

        const settlementInstructions = [];

        // Settle funds first
        while (payers.length > 0 && receivers.length > 0) {
            let payer = payers[0];
            let receiver = receivers[0];

            const settlementAmount = Math.min(payer.amount, receiver.amount);

            settlementInstructions.push(
                `${payer.member} pays ${settlementAmount} to ${receiver.member}`
            );

            payer.amount -= settlementAmount;
            receiver.amount -= settlementAmount;

            // Remove settled payers/receivers
            if (payer.amount === 0) payers.shift();
            if (receiver.amount === 0) receivers.shift();
        }

        // Settle shares
        for (let share of uniqueShares) {
            payers.forEach((payer) => {
                if (payer.shares[share]) {
                    receivers.forEach((receiver) => {
                        if (receiver.shares[share] && payer.shares[share] > 0) {
                            const shareAmount = Math.min(
                                payer.shares[share],
                                -receiver.shares[share]
                            );
                            settlementInstructions.push(
                                `${payer.member} transfers ${shareAmount} ${share} shares to ${receiver.member}`
                            );

                            payer.shares[share] -= shareAmount;
                            receiver.shares[share] += shareAmount;
                        }
                    });
                }
            });
        }

        return settlementInstructions;
    };

    return (
        <div>
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

            <div className="mt-5">
                <h2 className="text-xl font-semibold">Settlement Instructions</h2>
                <ul className="list-disc list-inside mt-2">
                    {settlements.map((settlement, index) => (
                        <li key={index} className="text-sm text-gray-700">
                            {settlement}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MultilateralNettingReport;
