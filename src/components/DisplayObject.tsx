import Modal from "./ui/Modal";
import Table from "./ui/Table";

const DisplayObjects = ({ trades }) => {
    const columns = [
        { header: "Buyer", accessor: "memberA" },
        { header: "Seller", accessor: "memberB" },
        { header: "Company", accessor: "company" },
        { header: "Shares", accessor: "shares" },
        { header: "Price", accessor: "price" },
    ];

    return (
        <Modal header="Trade Details" buttonText="Trade Details">
            <Table columns={columns} data={trades} />
        </Modal>
    );
};

export default DisplayObjects;
