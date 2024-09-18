import "./App.css";
import { useState, useEffect } from "react";
import TradeList from "./components/TradeList";
import DisplayObjects from "./components/DisplayObject";
import ClearingMemberBalance from "./components/ClearingMemberBalance";
import CorporateActionButton, {
    trades as StockList,
} from "./components/CorporateActionButton";
import MultilateralNettingReport from "./components/MultilateralNettingReport";
import FundObligation from "./components/FundObligation";
import ShareObligation from "./components/ShareObligation";
import StocksTable from "./components/StocksTable";
import Modal from "./components/ui/Modal";

function App() {
    const [trades, setTrades] = useState([
        // {
        //     memberA: "UBS",
        //     memberB: "BNY",
        //     company: "Apple",
        //     shares: 50,
        //     price: 150,
        // },
        // {
        //     memberA: "UBS",
        //     memberB: "BNY",
        //     company: "Apple",
        //     shares: 50,
        //     price: 150,
        // },
        // {
        //     memberA: "UBS",
        //     memberB: "BNY",
        //     company: "Apple",
        //     shares: 50,
        //     price: 150,
        // },
    ]);

    const [balances, setBalances] = useState({
        "JP Morgan": {
            shares: {
                Apple: 50,
                TCS: 100,
            },
            funds: 10000,
        },
        Citibank: {
            shares: {
                MRF: 200,
                Apple: 500,
            },
            funds: 40000,
        },
        BNY: {
            shares: {
                MRF: 10,
                Apple: 100,
            },
            funds: 10000,
        },
        UBS: {
            shares: {
                MRF: 110,
                Apple: 20,
            },
            funds: 51000,
        },
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

    const checkNegative = (funds, shares) => {
        if (funds < 0) return true;
        for (let key in shares) {
            if (shares[key] < 0) return true;
        }
        return false;
    };

    const transactions = calculateTransactions();
    useEffect(() => {
        // Make a copy of the balances object to avoid directly mutating state
        const updatedBalances = JSON.parse(JSON.stringify(balances)); // Deep copy to avoid mutating the original state

        // Get the last trade from the trades array
        const lastTrade = trades[trades.length - 1];

        if (lastTrade) {
            const { memberA, memberB, shares, price, company } = lastTrade;
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
        }

        console.log("Updated Balance after:", updatedBalances);
        setBalances(updatedBalances);
    }, [trades]); // Only runs when `trades` array changes

    const triggerChange = () => {
        const updatedBalances = JSON.parse(JSON.stringify(balances)); // Deep copy to avoid mutating the original state
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
    };

    const allShares = Object.keys(
        Object.values(balances).reduce((acc, curr) => {
            Object.keys(curr.shares).forEach((share) => (acc[share] = true));
            return acc;
        }, {})
    );

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Multilateral Netting System
            </h1>
            <br />

            <StocksTable />
            <CorporateActionButton
                balances={balances}
                setBalances={setBalances}
                triggerChange={triggerChange}
            />
            <br />
            <TradeList
                trades={trades}
                setTrades={setTrades}
                triggerChange={triggerChange}
            />
            <br />

            <ClearingMemberBalance
                balances={balances}
                setBalances={setBalances}
            />
            <br />

            <h1 className="text-3xl">Display</h1>
            <DisplayObjects trades={trades} />

            <FundObligation trades={trades} />
            <ShareObligation trades={trades} />

            <br />

            <div>
                <Modal
                    buttonText="View Clearing Member Balance"
                    header="Current Balance of Clearing Member"
                >
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Clearing Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Funds
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    colSpan={allShares.length}
                                >
                                    Shares
                                </th>
                            </tr>
                            <tr>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                                {allShares.map((share, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        {share}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(balances).map(
                                ([member, { funds, shares }]) => {
                                    const isNegative = checkNegative(
                                        funds,
                                        shares
                                    );
                                    return (
                                        <tr
                                            key={member}
                                            className={`hover:bg-gray-100 ${
                                                isNegative ? "bg-red-100" : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {member}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {funds}
                                            </td>
                                            {allShares.map((share) => (
                                                <td
                                                    key={share}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                                >
                                                    {shares[share] || 0}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </Modal>
                <h1>Final Report</h1>
                <MultilateralNettingReport trades={trades} />
            </div>
        </>
    );
}

export default App;
