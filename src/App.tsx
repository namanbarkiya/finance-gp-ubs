import "./App.css";

import { useState } from "react";
import TradeList from "./components/TradeList";
import DisplayObjects from "./components/DisplayObject";
import ClearingMemberBalance from "./components/ClearingMemberBalance";

function App() {

  const [trades, setTrades] = useState([]);
  const [balances, setBalances] = useState({});
  const [corporateActions, setCorporateActions] = useState([]);

    return (
        <>
            <h1 className="text-3xl">Multilateral Netting System</h1>
            <br/>

            <TradeList trades={trades} setTrades={setTrades}/>
            <br/>

            <ClearingMemberBalance balances={balances} setBalances={setBalances}/>
            <br/>

            <h1 className="text-3xl">Display</h1>
            <DisplayObjects trades={trades}/>

        </>
    );
}

export default App;
