import React from 'react'

const ShareObligation = ({trades}) => {

    const calculateTransactions = () => {
        const transactions = [];
  
        trades.forEach(({ memberA, memberB, company, shares }) => {
          transactions.push({
            buyer: memberA,
            seller: memberB,
            company,
            quantity: shares,
          });
        });
  
        return transactions;
    };
  
    const transactions = calculateTransactions();

  return (
    <>
        <h2>Share Obligation Report</h2>

        <table border="1">
        <thead>
            <tr>
            <th>Clearing Member (Buyer)</th>
            <th>Quantity (+)</th>
            <th>Share Name</th>
            <th>Clearing Member (Seller)</th>
            <th>Quantity (-)</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map(({ buyer, seller, company, quantity }, index) => (
            <tr key={index}>
                <td>{buyer}</td>
                <td>+{quantity}</td>
                <td>{company}</td>
                <td>{seller}</td>
                <td>{-quantity}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </>
  )
}

export default ShareObligation