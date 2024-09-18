import { trades } from "./CorporateActionButton";
import Modal from "./ui/Modal";

export default function StocksTable() {
    return (
        <>
            {/* <StockUpdateComponent
                stockList={stockList}
                setStockList={setStockList}
            /> */}
            <Modal buttonText="Stocks List" header="Stocks List">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.from(trades).map(
                                ([company, shares], index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {shares}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
}
