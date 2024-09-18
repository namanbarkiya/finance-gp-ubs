import React from 'react'

const FundObligation = ({trades}) => {

    const obligations = trades.reduce((acc, trade) => {
        const amount = trade.shares * trade.price;
  
        // Buyer (memberA) owes Seller (memberB)
        const key = `${trade.memberA} owes ${trade.memberB}`;
        
        if (!acc[key]) acc[key] = 0;
        acc[key] += amount;
  
        return acc;
    }, {});
  

    // Convert obligations to a table format
    const tableData = Object.entries(obligations).map(([description, amount]) => ({
        description,
        amount: amount.toFixed(2)
    }));

  return (
    <>
        <h2>Fund Obligation Report</h2>
        <table border="1">
            <thead>
              <tr>
                <th>Obligation</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.description}</td>
                  <td>{row.amount}</td>
                </tr>
                  ))}
            </tbody>
        </table>
    </>
  )
}

export default FundObligation