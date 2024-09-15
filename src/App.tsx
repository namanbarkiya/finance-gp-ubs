import "./App.css";

import { useState } from "react";
import TradeList from "./components/TradeList";
import DisplayObjects from "./components/DisplayObject";
import ClearingMemberBalance from "./components/ClearingMemberBalance";
import CorporateActionButton from "./components/CorporateActionButton";

function App() {
    const [trades, setTrades] = useState([]);
    const [balances, setBalances] = useState({});
    const [corporateActions, setCorporateActions] = useState([]);

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Multilateral Netting System
            </h1>
            <br />

            <TradeList trades={trades} setTrades={setTrades} />
            <br />

            <ClearingMemberBalance
                balances={balances}
                setBalances={setBalances}
            />
            <br />

            <h1 className="text-3xl">Display</h1>
            <DisplayObjects trades={trades} />
            <CorporateActionButton />
        </>
    );
}

export default App;
