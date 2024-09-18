import React, { useState, useEffect } from 'react';

const MultilateralNettingReport = ({ trades }) => {
  const [report, setReport] = useState([]);
  const [uniqueShares, setUniqueShares] = useState([]);

  useEffect(() => {
    const balances = {};
    const sharesSet = new Set();

    trades.forEach(trade => {
      const { memberA, memberB, company, shares, price } = trade;
      const totalAmount = shares * price;

      // Add company to unique shares set
      sharesSet.add(company);

      // Member A (buyer) loses funds, gains shares
      if (!balances[memberA]) {
        balances[memberA] = { funds: 0, shares: {} };
      }
      balances[memberA].funds -= totalAmount; // Deduct funds
      balances[memberA].shares[company] = (balances[memberA].shares[company] || 0) + shares; // Add shares

      // Member B (seller) gains funds, loses shares
      if (!balances[memberB]) {
        balances[memberB] = { funds: 0, shares: {} };
      }
      balances[memberB].funds += totalAmount; // Add funds
      balances[memberB].shares[company] = (balances[memberB].shares[company] || 0) - shares; // Deduct shares
    });

    // Convert balances to a report array
    const reportData = Object.entries(balances).map(([member, { funds, shares }]) => ({
      member,
      funds,
      shares
    }));

    setReport(reportData);
    setUniqueShares([...sharesSet]);
  }, [trades]);

  return (
    <table border="1" style={{ marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Clearing Member</th>
          <th>Net Funds</th>
          {uniqueShares.map((share, index) => (
            <th key={index}>{share} Shares</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {report.map((row, index) => (
          <tr key={index}>
            <td>{row.member}</td>
            <td>{row.funds >= 0 ? `+${row.funds}` : row.funds}</td>
            {uniqueShares.map((share) => (
              <td key={share}>{row.shares[share] || 0}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



export default MultilateralNettingReport;
