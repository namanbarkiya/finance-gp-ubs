import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const TradeList = ({ trades, setTrades, triggerChange }) => {
    const [trade, setTrade] = useState({
        memberA: "",
        memberB: "",
        company: "",
        shares: 0,
        price: 0,
    });

    const handleAddTrade = () => {
        setTrades([...trades, trade]);
        // triggerChange();
        setTrade({
            memberA: "",
            memberB: "",
            company: "",
            shares: 0,
            price: 0,
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold">Trade List</h2>
            {/* <input type="text" placeholder="Buyer" value={trade.memberA} onChange={(e) => setTrade({ ...trade, memberA: e.target.value })} />
      <input type="text" placeholder="Seller" value={trade.memberB} onChange={(e) => setTrade({ ...trade, memberB: e.target.value })} />
      <input type="text" placeholder="Company" value={trade.company} onChange={(e) => setTrade({ ...trade, company: e.target.value })} />
      <input type="number" placeholder="Shares" value={trade.shares} onChange={(e) => setTrade({ ...trade, shares: +e.target.value })} />
      <input type="number" placeholder="Price" value={trade.price} onChange={(e) => setTrade({ ...trade, price: +e.target.value })} /> */}

            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Buyer"
                    value={trade.memberA}
                    onChange={(e) =>
                        setTrade({ ...trade, memberA: e.target.value })
                    }
                    label="Buyer"
                />
                <Input
                    type="text"
                    placeholder="Seller"
                    value={trade.memberB}
                    onChange={(e) =>
                        setTrade({ ...trade, memberB: e.target.value })
                    }
                    label="Seller"
                />
                <Input
                    type="text"
                    placeholder="Company"
                    value={trade.company}
                    onChange={(e) =>
                        setTrade({ ...trade, company: e.target.value })
                    }
                    label="Company"
                />
                <Input
                    type="number"
                    placeholder="Shares"
                    value={trade.shares}
                    onChange={(e) =>
                        setTrade({ ...trade, shares: +e.target.value })
                    }
                    label="Shares"
                />
                <Input
                    type="number"
                    placeholder="Price"
                    value={trade.price}
                    onChange={(e) =>
                        setTrade({ ...trade, price: +e.target.value })
                    }
                    label="Price"
                />
            </div>
            <Button buttonText="Add Trade" onClick={handleAddTrade} />
        </div>
    );
};

export default TradeList;
