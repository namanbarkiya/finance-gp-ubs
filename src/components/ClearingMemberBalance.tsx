import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

const ClearingMemberBalance = ({ balances, setBalances }) => {
    const [member, setMember] = useState("");
    const [funds, setFunds] = useState(0);
    const [shareSymbol, setShareSymbol] = useState("");
    const [shareQuantity, setShareQuantity] = useState(0);
    const [shares, setShares] = useState({});

    const [modalOpen, setModalOpen] = useState(false);

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
            <h2 className="text-2xl font-semibold">Clearing Member Balances</h2>
            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Member"
                    value={member}
                    onChange={(e) => setMember(e.target.value.toUpperCase())}
                    label="Member"
                />
                <Input
                    type="number"
                    placeholder="Funds"
                    value={funds}
                    onChange={(e) => setFunds(+e.target.value)}
                    label="Funds"
                />

                <Input
                    type="text"
                    placeholder="Share Symbol (e.g., X, Y)"
                    value={shareSymbol}
                    onChange={(e) =>
                        setShareSymbol(e.target.value.toUpperCase())
                    }
                    label="Share Symbol (e.g., X, Y)"
                />
                <Input
                    type="number"
                    placeholder="Share Quantity"
                    value={shareQuantity}
                    onChange={(e) => setShareQuantity(+e.target.value)}
                    label="Share Quantity"
                />
            </div>
            <Button onClick={handleAddShare} buttonText="Add Share" />

            <div className="gap-4 bg-black/10 w-fit p-4 rounded-lg">
                {/* <h4 className="text-lg font-semibold text-gray-900">
                    Current Shares:
                </h4> */}
                {Object.entries(shares).map(([symbol, quantity]) => (
                    <p key={symbol}>
                        {symbol}: {quantity}
                    </p>
                ))}
            </div>

            <Button onClick={handleAddBalance} buttonText="Submit Balance" />

            <button
                onClick={() => setModalOpen(!modalOpen)}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 h-fit"
                type="button"
            >
                View Member Balance
            </button>

            {modalOpen ? (
                <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-h-60">
                            <div className="text-white">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Current Balance
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                </div>
                                {Object.entries(balances).map(
                                    ([member, { funds, shares }]) => (
                                        <div
                                            key={member}
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                                        >
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {member}
                                            </h3>
                                            <p>Funds: {funds}</p>
                                            <p>
                                                {Object.entries(shares).map(
                                                    ([symbol, quantity]) => (
                                                        <p key={symbol}>
                                                            {symbol}: {quantity}
                                                        </p>
                                                    )
                                                )}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ClearingMemberBalance;
