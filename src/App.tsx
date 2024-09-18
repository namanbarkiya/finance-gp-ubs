import "./App.css";
import { useState,useEffect } from "react";
import TradeList from "./components/TradeList";
import DisplayObjects from "./components/DisplayObject";
import ClearingMemberBalance from "./components/ClearingMemberBalance";
import CorporateActionButton from "./components/CorporateActionButton";
import MultilateralNettingReport from "./components/MultilateralNettingReport";
import FundObligation from "./components/FundObligation";
import ShareObligation from "./components/ShareObligation";


function App() {

    const [trades, setTrades] = useState([
      { memberA: "JP Morgan", memberB: "UBS", company: "Apple", shares: 50, price: 100 },
      // { memberA: "JP Morgan", memberB: "UBS", company: "MRF", shares: 80, price: 250 },
      { memberA: "UBS", memberB: "BNY", company: "Apple", shares: 50, price: 150 },
      // { memberA: "UBS", memberB: "JP Morgan", company: "Apple", shares: 100, price: 150 },
      // { memberA: "UBS", memberB: "JP Morgan", company: "MRF", shares: 70, price: 150 },
    ]);

    const [balances, setBalances] = useState({
      "JP Morgan": { 
        "shares": {
          "Apple": 50,
          "TCS": 100,
        },
        "funds": 40000
      },
      "Citibank": { 
        "shares": {
          "MRF": 200,
          "Apple": 500
        },
        "funds": 40000
      },
      "BNY": { 
        "shares": {
          "MRF": 10,
          "Apple": 100
        },
        "funds": 10000
      },
      "UBS": { 
        "shares": {
          "MRF": 110,
          "Apple": 20
        },
        "funds": 51000
      }
    });

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

    useEffect(() => {
      // Make a copy of the balances object to avoid directly mutating state
      const updatedBalances = JSON.parse(JSON.stringify(balances));  // Deep copy to avoid mutating the original state
      // const updatedBalances = balances
      console.log("Updated Balance before:", updatedBalances);
    
      trades.forEach((trade) => {
        const { memberA, memberB, shares, price, company } = trade;
        const totalAmount = shares * price;
    
        // Deduct the funds from memberA (buyer)
        if (updatedBalances[memberA]) {
          updatedBalances[memberA].funds -= totalAmount;
        } else {
          updatedBalances[memberA] = { funds: -totalAmount, shares: {} };
        }
    
        // Add the funds to memberB (seller)
        if (updatedBalances[memberB]) {
          updatedBalances[memberB].funds += totalAmount;
        } else {
          updatedBalances[memberB] = { funds: totalAmount, shares: {} };
        }
    
        // Update shares for memberA (buyer)
        if (updatedBalances[memberA].shares[company]) {
          updatedBalances[memberA].shares[company] += shares;
        } else {
          updatedBalances[memberA].shares[company] = shares;
        }
    
        // Update shares for memberB (seller)
        if (updatedBalances[memberB].shares[company]) {
          updatedBalances[memberB].shares[company] -= shares;
        } else {
          updatedBalances[memberB].shares[company] = -shares;
        }
      });
    
      console.log("Updated Balance after", updatedBalances);
      setBalances(updatedBalances);
    }, [trades]);  // Only runs when `trades` array changes

    const triggerChange = () =>{
      
      const updatedBalances = JSON.parse(JSON.stringify(balances));  // Deep copy to avoid mutating the original state
      // console.log("Updated Balance before:", updatedBalances);
    
      trades.forEach((trade) => {
        const { memberA, memberB, shares, price, company } = trade;
        const totalAmount = shares * price;
    
        // Deduct the funds from memberA (buyer)
        if (updatedBalances[memberA]) {
          updatedBalances[memberA].funds -= totalAmount;
        } else {
          updatedBalances[memberA] = { funds: -totalAmount, shares: {} };
        }
    
        // Add the funds to memberB (seller)
        if (updatedBalances[memberB]) {
          updatedBalances[memberB].funds += totalAmount;
        } else {
          updatedBalances[memberB] = { funds: totalAmount, shares: {} };
        }
    
        // Update shares for memberA (buyer)
        if (updatedBalances[memberA].shares[company]) {
          updatedBalances[memberA].shares[company] += shares;
        } else {
          updatedBalances[memberA].shares[company] = shares;
        }
    
        // Update shares for memberB (seller)
        if (updatedBalances[memberB].shares[company]) {
          updatedBalances[memberB].shares[company] -= shares;
        } else {
          updatedBalances[memberB].shares[company] = -shares;
        }
      });
    
      // console.log("Updated Balance after", updatedBalances);
      setBalances(updatedBalances);
    }
    

    const allShares = Object.keys(
      Object.values(balances).reduce((acc, curr) => {
        Object.keys(curr.shares).forEach(share => acc[share] = true);
        return acc;
      }, {})
    );

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Multilateral Netting System
            </h1>
            <br />

            <TradeList trades={trades} setTrades={setTrades} triggerChange={triggerChange}/>
            <br />

            <ClearingMemberBalance
                balances={balances}
                setBalances={setBalances}
            />
            <br />

            <h1 className="text-3xl">Display</h1>
            <DisplayObjects trades={trades} />
            <CorporateActionButton balances={balances} setBalances={setBalances} triggerChange={triggerChange}/>
            <FundObligation trades={trades}/>
            <ShareObligation trades={trades}/>

            <br/>

            <div>
              
                
              <table border="1">
              <thead>
                <tr>
                  <th>Clearing Member</th>
                  <th>Funds</th>
                  <th colSpan={allShares.length}>Shares</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  {allShares.map((share, index) => (
                    <th key={index}>{share}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(balances).map(([member, { funds, shares }]) => (
                  <tr key={member}>
                    <td>{member}</td>
                    <td>{funds}</td>
                    {allShares.map((share) => (
                      <td key={share}>{shares[share] || 0}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <h1>Final Report</h1>
            <MultilateralNettingReport trades={trades}/>

          </div>

        </>
    );
};

export default App;
