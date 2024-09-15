import React, { useState } from "react";

const ClearingMemberBalance = ({ balances, setBalances }) => {
  const [member, setMember] = useState("");
  const [funds, setFunds] = useState(0);
  const [shareSymbol, setShareSymbol] = useState("");
  const [shareQuantity, setShareQuantity] = useState(0);
  const [shares, setShares] = useState({});

  // Handle adding/updating a specific share balance
  const handleAddShare = () => {
    setShares((prevShares) => ({
      ...prevShares,
      [shareSymbol]: shareQuantity,
    }));
    setShareSymbol("");
    setShareQuantity(0);
  };

  // Handle adding/updating the balance for a member
  const handleAddBalance = () => {
    const updatedBalances = { ...balances, [member]: { funds, shares } };
    setBalances(updatedBalances);
    setMember("");
    setFunds(0);
    setShares({});  
  };

  return (
    <div>
      <h1>Clearing Member Balances</h1>
      <input
        type="text"
        placeholder="Member"
        value={member}
        onChange={(e) => setMember(e.target.value.toUpperCase())}
      />
      <input
        type="number"
        placeholder="Funds"
        value={funds}
        onChange={(e) => setFunds(+e.target.value)}
      />

      {/* Input fields for shares and their quantities */}
      <input
        type="text"
        placeholder="Share Symbol (e.g., X, Y)"
        value={shareSymbol}
        onChange={(e) => setShareSymbol(e.target.value.toUpperCase())}
      />
      <input
        type="number"
        placeholder="Share Quantity"
        value={shareQuantity}
        onChange={(e) => setShareQuantity(+e.target.value)}
      />
      <button onClick={handleAddShare}>Add Share</button>

      <div>
        <h4>Current Shares</h4>
        {Object.entries(shares).map(([symbol, quantity]) => (
          <p key={symbol}>
            {symbol}: {quantity}
          </p>
        ))}
      </div>

      <button onClick={handleAddBalance}>Add Balance</button>
    </div>
  );
};

export default ClearingMemberBalance;
