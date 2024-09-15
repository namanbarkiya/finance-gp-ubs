import React, { useState } from "react";

const TradeList = ({ trades, setTrades }) => {
  const [trade, setTrade] = useState({ memberA: "", memberB: "", company: "", shares: 0, price: 0 });

  const handleAddTrade = () => {
    setTrades([...trades, trade]);
    setTrade({ memberA: "", memberB: "", company: "", shares: 0, price: 0 });
    
  };

  return (
    <div>
      <h2>Trade List</h2>
      <input type="text" placeholder="Buyer" value={trade.memberA} onChange={(e) => setTrade({ ...trade, memberA: e.target.value })} />
      <input type="text" placeholder="Seller" value={trade.memberB} onChange={(e) => setTrade({ ...trade, memberB: e.target.value })} />
      <input type="text" placeholder="Company" value={trade.company} onChange={(e) => setTrade({ ...trade, company: e.target.value })} />
      <input type="number" placeholder="Shares" value={trade.shares} onChange={(e) => setTrade({ ...trade, shares: +e.target.value })} />
      <input type="number" placeholder="Price" value={trade.price} onChange={(e) => setTrade({ ...trade, price: +e.target.value })} />
      <button onClick={handleAddTrade}>Add Trade</button>
    </div>
  );
};

export default TradeList;
