import React from 'react';

const DisplayObjects = ({trades}) => {

//   const data = [
//     { id: 1, name: 'John Doe', age: 28 },
//     { id: 2, name: 'Jane Smith', age: 34 },
//     { id: 3, name: 'Alice Johnson', age: 45 }
//   ];

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {trades.map((trade) => (
          <li>
            {trade.memberA} - {trade.memberB} - {trade.company} - {trade.shares} - {trade.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayObjects;
