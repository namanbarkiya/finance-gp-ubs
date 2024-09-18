import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { trades } from "./CorporateActionButton";

const StockUpdateComponent = ({ stockList, setStockList }) => {
    const [stock, setStock] = useState({
        name: "",
        price: 0,
    });

    const handleAddStockUpdate = () => {
        trades.set(stock.name, stock.price);
        // get current value of trades and set it to setStockList trades is map
        console.log(trades.keys(), trades.values());
        // make new map from above
        const newStockMap = new Map<string, number>(
            Array.from(trades.entries()).map(([key, value]) => [key, value])
        );

        setStockList(newStockMap);

        setStock({
            name: "",
            price: 0,
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold">Trade List</h2>

            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Share Name"
                    value={stock.name}
                    onChange={(e) =>
                        setStock({ ...stock, name: e.target.value })
                    }
                    label="Share Name"
                />
                <Input
                    type="text"
                    placeholder="Share Price"
                    value={stock.price}
                    onChange={(e) =>
                        setStock({ ...stock, price: +e.target.value })
                    }
                    label="Share Price"
                />
            </div>
            <Button buttonText="Add Trade" onClick={handleAddStockUpdate} />
        </div>
    );
};

export default StockUpdateComponent;
