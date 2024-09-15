import React, { useState } from "react";

// The trades map with current stock prices
const trades = new Map<string, number>([
  ["Apple", 10],
  ["TCS", 20],
  ["MRF", 30],
  ["WXY company ltd.", 50]
]);

// The JSON object representing organizations and their shares
const organizations = {
  "Morgan Stanley": { 
    "share": {
      "Apple": 50,
      "TCS": 100
    },
    "funds": 2500
  },
  "Citibank": { 
    "share": {
      "MRF": 200,
      "Apple": 500
    },
    "funds": 31000
  }
};

// Function to apply dividends and update funds for all organizations
function applyDividends(tradeCompany: string, dividend: number) {
  Object.keys(organizations).forEach((orgName) => {
    const org = organizations[orgName];
    const shares = org.share[tradeCompany]; // Get the number of shares the organization has in the trade company
    const currentPrice = trades.get(tradeCompany); // Get the current stock price

    if (shares && currentPrice) {
      // Calculate only the dividend value to add to funds
      const dividendValue = (dividend / 100) * (shares * currentPrice);
      org.funds += dividendValue;
      console.log(`New funds for ${orgName}: ${org.funds}`);
    } else {
      console.log(`No shares for ${tradeCompany} in ${orgName}`);
    }
  });
}

// Function to apply stock splits and update share counts for all organizations
function applyStockSplit(tradeCompany: string, splitRatio: string) {
  const [numerator, denominator] = splitRatio.split(":").map(Number);

  if (!numerator || !denominator || isNaN(numerator) || isNaN(denominator)) {
    console.log(`Invalid split ratio: ${splitRatio}`);
    return;
  }

  Object.keys(organizations).forEach((orgName) => {
    const org = organizations[orgName];
    const shares = org.share[tradeCompany];

    if (shares) {
      // Multiply the current shares by the split ratio
      org.share[tradeCompany] = shares * (numerator / denominator);
      console.log(
        `New shares for ${tradeCompany} in ${orgName}: ${org.share[tradeCompany]}`
      );
    } else {
      console.log(`${orgName} does not hold shares in ${tradeCompany}`);
    }
  });
}


const CorporateActionButton: React.FC = () => {
  const [action, setAction] = useState<"dividend" | "split" | null>(null);
  const [tradeCompany, setTradeCompany] = useState<string>("");
  const [dividend, setDividend] = useState<number>(0);
  const [splitRatio, setSplitRatio] = useState<string>("");

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
      alert("Stock split applied.");
    }
    handleCloseModal(); // Close the modal after submission
  };

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

  return (
    <div>
      <button style={buttonStyle} onClick={handleDividendClick}>
        Stock Dividend
      </button>
      <button style={buttonStyle} onClick={handleSplitClick}>
        Stock Split
      </button>

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
                    placeholder="e.g. 2:1"
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
