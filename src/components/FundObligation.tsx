import React from "react";
import Table from "./ui/Table";
import Modal from "./ui/Modal";

const FundObligation = ({ trades }) => {
    const obligations = trades.reduce((acc, trade) => {
        const amount = trade.shares * trade.price;

        // Buyer (memberA) owes Seller (memberB)
        const key = `${trade.memberA} owes ${trade.memberB}`;

        if (!acc[key]) acc[key] = 0;
        acc[key] += amount;

        return acc;
    }, {});

    // Convert obligations to a table format
    const tableData = Object.entries(obligations).map(
        ([description, amount]) => ({
            description,
            amount: amount.toFixed(2),
        })
    );

    const columns = [
        { header: "Obligation", accessor: "description" },
        { header: "Amount", accessor: "amount" },
    ];
    return (
        <>
            <Modal
                header="Fund Obligation Report"
                buttonText="Fund Obligation Report"
            >
                <Table columns={columns} data={tableData} />
            </Modal>
        </>
    );
};

export default FundObligation;
