import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

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

            {/* <Modal
                buttonText="View Clearing Member Balance"
                header="Current Balance of Clearing Member"
            >
                {Object.entries(balances).map(([member, { funds, shares }]) => (
                    <div
                        key={member}
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
                    >
                        <h3 className="font-semibold text-gray-900">
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
                ))}
            </Modal> */}
        </div>
    );
};

export default ClearingMemberBalance;
