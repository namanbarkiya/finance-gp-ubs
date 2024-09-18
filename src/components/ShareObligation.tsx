import React from "react";
import Table from "./ui/Table";
import Modal from "./ui/Modal";

const ShareObligation = ({ trades }) => {
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

    const columns = [
        { header: "Clearing Member (Buyer)", accessor: "buyer" },
        { header: "Quantity (+)", accessor: "quantity" },
        { header: "Share Name", accessor: "company" },
        { header: "Clearing Member (Seller)", accessor: "seller" },
        { header: "Quantity (-)", accessor: "quantity" },
    ];

    return (
        <>
            <Modal
                header="Share Obligation Report"
                buttonText="Share Obligation Report"
            >
                <Table columns={columns} data={transactions} />
            </Modal>
        </>
    );
};

export default ShareObligation;
