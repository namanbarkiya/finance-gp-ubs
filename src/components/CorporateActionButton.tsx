import React, { useState } from "react";

// The trades map with current stock prices
const trades = new Map<string, number>([
  ["Apple", 10],
  ["TCS", 20],
  ["MRF", 30],
  ["WXY company ltd.", 50]
]);



const CorporateActionButton: React.FC = ({balances, setBalances, triggerChange}) => {

  const [action, setAction] = useState<"dividend" | "split" | null>(null);
  const [tradeCompany, setTradeCompany] = useState<string>("");
  const [dividend, setDividend] = useState<number>(0);
  const [splitRatio, setSplitRatio] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open/close the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDividendClick = () => {
    setAction("dividend");
    setTradeCompany("");
    setDividend(0);
  };

  const handleSplitClick = () => {
    setAction("split");
    setTradeCompany("");
    setSplitRatio("");
  };

  const handleCloseModal = () => {
    setAction(null); // Close modal by setting action to null
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "dividend") {
      
      applyDividends(tradeCompany, dividend);
      alert("Dividend applied and funds updated for all relevant organizations.");
    } else if (action === "split") {
      applyStockSplit(tradeCompany, splitRatio);
      alert("Stock split applied and shares/price updated for all relevant organizations.");
    }
    handleCloseModal(); // Close the modal after submission
  };

  const applyDividends = (tradeCompany: string, dividend: number) =>{

    // console.log("Received balance", organizations);
    const organizations = JSON.parse(JSON.stringify(balances));
    Object.keys(organizations).forEach((orgName) => {
      const org = organizations[orgName];
      const shares = org.shares[tradeCompany];
      const currentPrice = trades.get(tradeCompany);
  
      if (shares && currentPrice) {
        // Calculate the dividend value to add to funds
        const dividendValue = (dividend / 100) * (shares * currentPrice);
        org.funds += dividendValue;
  
        console.log(`Updated funds for ${orgName} after dividend: ${org.funds}`);
      } else {
        console.log(`No shares for ${tradeCompany} in ${orgName}`);
      }
    });
  
    // Display the updated organizations object
      
    setBalances(organizations);
    // triggerChange();
    console.log("Updated Organizations Object after Dividend:", JSON.stringify(organizations, null, 2));
    console.log("Updated balances", balances);
  }

  const applyStockSplit =(tradeCompany: string, splitRatio: string) =>{

    const organizations = JSON.parse(JSON.stringify(balances));

    const [numerator, denominator] = splitRatio.split(":").map(Number);

    if (!numerator || !denominator || isNaN(numerator) || isNaN(denominator)) {
      console.log(`Invalid split ratio: ${splitRatio}`);
      return;
    }

    // Iterate over all organizations to update share counts
    Object.keys(organizations).forEach((orgName) => {
      const org = organizations[orgName];
      const shares = org.shares[tradeCompany];

      if (shares) {
        // Multiply the current shares by the split ratio
        org.shares[tradeCompany] = shares * (numerator / denominator);

        console.log(
          `Updated shares for ${tradeCompany} in ${orgName}: ${org.shares[tradeCompany]}`
        );
      } else {
        console.log(`${orgName} does not hold shares in ${tradeCompany}`);
      }

      setBalances(organizations);
  });

  // Update the stock price in the trades map based on the split ratio
  const currentPrice = trades.get(tradeCompany);
  if (currentPrice) {
    const newPrice = currentPrice * (denominator / numerator); // New price after stock split
    trades.set(tradeCompany, newPrice);

    console.log(
      `Updated price for ${tradeCompany} after split: ${newPrice}`
    );
  } else {
    console.log(`Trade company ${tradeCompany} not found in trades map`);
  }

  // Display the updated organizations and trades objects
  console.log("Updated Organizations Object after Stock Split:", JSON.stringify(organizations, null, 2));
  console.log("Updated Trades Map after Stock Split:", JSON.stringify([...trades], null, 2));
  }

  const buttonStyle: React.CSSProperties = {
    marginRight: "10px",
    padding: "10px 20px",
    border: "2px solid black",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    margin: "8px 0",
    border: "2px solid black",
    borderRadius: "4px",
    width: "50%", 
  };

  const submitButtonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "10px 20px",
    border: "2px solid black",
    borderRadius: "5px",
    backgroundColor: "#add8e6",
    cursor: "pointer",
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '400px',
      textAlign: 'center',
    },
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleDividendClick}>
        Stock Dividend
      </button>
      <button style={buttonStyle} onClick={handleSplitClick}>
        Stock Split
      </button>

      <button onClick={toggleModal}>Get Current Price</button>

      {/* Modal for displaying the table */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Current Prices</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Share Name</th>
                  <th>Current Price</th>
                </tr>
              </thead>
              <tbody>
                {[...trades.entries()].map(([shareName, price]) => (
                  <tr key={shareName}>
                    <td>{shareName}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Button to close the modal */}
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      {action && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>

            {action === "dividend" && (
              <form onSubmit={handleSubmit}>
                <h3>Stock Dividend</h3>
                <div>
                  <label>Trade Company:</label>
                  <input
                    type="text"
                    value={tradeCompany}
                    onChange={(e) => setTradeCompany(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label>Dividend Percentage:</label>
                  <input
                    type="number"
                    value={dividend}
                    onChange={(e) => setDividend(parseFloat(e.target.value))}
                    style={inputStyle}
                    required
                  />
                </div>
                <button type="submit" style={submitButtonStyle}>
                  Submit Dividend
                </button>
              </form>
            )}

            {action === "split" && (
              <form onSubmit={handleSubmit}>
                <h3>Stock Split</h3>
                <div>
                  <label>Trade Company:</label>
                  <input
                    type="text"
                    value={tradeCompany}
                    onChange={(e) => setTradeCompany(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label>Stock Split Ratio:</label>
                  <input
                    type="text"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(e.target.value)}
                    placeholder="e.g. 3:1"
                    style={inputStyle}
                    required
                  />
                </div>
                <button type="submit" style={submitButtonStyle}>
                  Submit Stock Split
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateActionButton;
