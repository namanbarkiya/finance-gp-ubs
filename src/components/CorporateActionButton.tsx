// import React, { useState } from "react";

// const CorporateActionButton: React.FC = () => {
//   const [action, setAction] = useState<"dividend" | "split" | null>(null);
//   const [organization, setOrganization] = useState<string>("");
//   const [tradeCompany, setTradeCompany] = useState<string>("");
//   const [dividend, setDividend] = useState<number>(0);
//   const [splitRatio, setSplitRatio] = useState<string>("");

//   const handleDividendClick = () => {
//     setAction("dividend");
//     setOrganization("");
//     setDividend(0);
//   };

//   const handleSplitClick = () => {
//     setAction("split");
//     setOrganization("");
//     setSplitRatio("");
//   };

//   const handleCloseModal = () => {
//     setAction(null); // Close modal by setting action to null
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (action === "dividend") {
//       console.log(`Organization: ${organization}, Dividend: ${dividend}`);
//     } else if (action === "split") {
//       console.log(`Organization: ${organization}, Stock Split Ratio: ${splitRatio}`);
//     }
//     handleCloseModal(); // Close the modal after submission
//   };

//   const buttonStyle: React.CSSProperties = {
//     marginRight: "10px",
//     padding: "10px 20px",
//     border: "2px solid black",
//     borderRadius: "5px",
//     backgroundColor: "#f0f0f0",
//     cursor: "pointer",
//   };

//   const inputStyle: React.CSSProperties = {
//     padding: "8px",
//     margin: "8px 0",
//     border: "2px solid black",
//     borderRadius: "4px",
//     width: "50%", 
//   };

//   const submitButtonStyle: React.CSSProperties = {
//     marginTop: "10px",
//     padding: "10px 20px",
//     border: "2px solid black",
//     borderRadius: "5px",
//     backgroundColor: "#add8e6",
//     cursor: "pointer",
//   };

//   return (
//     <div>
//       <button style={buttonStyle} onClick={handleDividendClick}>
//         Stock Dividend
//       </button>
//       <button style={buttonStyle} onClick={handleSplitClick}>
//         Stock Split
//       </button>

//       {action && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-button" onClick={handleCloseModal}>X</button>

//             {action === "dividend" && (
//               <form onSubmit={handleSubmit}>
//                 <h3>Stock Dividend</h3>
//                 <div>
//                   <label>Organization of Clearing Member:</label>
//                   <input
//                     type="text"
//                     value={organization}
//                     onChange={(e) => setOrganization(e.target.value)}
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Trade Company:</label>
//                   <input
//                     type="text"
//                     value={tradeCompany}
//                     onChange={(e) => setTradeCompany(e.target.value)}
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Dividend:</label>
//                   <input
//                     type="number"
//                     value={dividend}
//                     onChange={(e) => setDividend(parseFloat(e.target.value))}
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <button type="submit" style={submitButtonStyle}>
//                   Submit Dividend
//                 </button>
//               </form>
//             )}

//             {action === "split" && (
//               <form onSubmit={handleSubmit}>
//                 <h3>Stock Split</h3>
//                 <div>
//                   <label>Organization of Clearing Member:</label>
//                   <input
//                     type="text"
//                     value={organization}
//                     onChange={(e) => setOrganization(e.target.value)}
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Trade Company:</label>
//                   <input
//                     type="text"
//                     value={tradeCompany}
//                     onChange={(e) => setTradeCompany(e.target.value)}
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Stock Split Ratio:</label>
//                   <input
//                     type="text"
//                     value={splitRatio}
//                     onChange={(e) => setSplitRatio(e.target.value)}
//                     placeholder="e.g. 2:1"
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 <button type="submit" style={submitButtonStyle}>
//                   Submit Stock Split
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorporateActionButton;


import React, { useState } from "react";

// The trades map with current stock prices
const trades = new Map<string, number>([
  ["XYZ Trading Co.", 10],
  ["ABC company", 20],
  ["PQR company", 30],
  ["WXY company ltd.", 50]
]);

// The JSON object representing organizations and their shares
const organizations = {
  "Morgan Stanley": { 
    "share": {
      "XYZ Trading Co.": 50,
      "ABC company": 100
    },
    "funds": 2500
  },
  "Citibank": { 
    "share": {
      "PQR company": 200,
      "WXY company ltd.": 500
    },
    "funds": 31000
  }
};

// Function to apply dividends and update funds
function applyDividends(org: any, tradeCompany: string, dividend: number) {
  const shares = org.share;
  const stockCount = shares[tradeCompany];
  const currentPrice = trades.get(tradeCompany);

  if (currentPrice && stockCount) {
    // Calculate only the dividend value to add to funds
    const dividendValue = (dividend / 100) * (stockCount * currentPrice);
    org.funds += dividendValue;
  } else {
    console.log(`Trade Company ${tradeCompany} not found for organization`);
  }
}

// Function to apply stock splits and update share counts
function applyStockSplit(org: any, tradeCompany: string, splitRatio: string) {
  const shares = org.share;
  const stockCount = shares[tradeCompany];

  if (stockCount && splitRatio.includes(":")) {
    const [numerator, denominator] = splitRatio.split(":").map(Number);
    if (numerator && denominator) {
      shares[tradeCompany] = stockCount * (numerator / denominator);
    }
  } else {
    console.log(`Invalid Trade Company or split ratio`);
  }
}

const CorporateActionButton: React.FC = () => {
  const [action, setAction] = useState<"dividend" | "split" | null>(null);
  const [organization, setOrganization] = useState<string>("");
  const [tradeCompany, setTradeCompany] = useState<string>("");
  const [dividend, setDividend] = useState<number>(0);
  const [splitRatio, setSplitRatio] = useState<string>("");

  const handleDividendClick = () => {
    setAction("dividend");
    setOrganization("");
    setTradeCompany("");
    setDividend(0);
  };

  const handleSplitClick = () => {
    setAction("split");
    setOrganization("");
    setTradeCompany("");
    setSplitRatio("");
  };

  const handleCloseModal = () => {
    setAction(null); // Close modal by setting action to null
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "dividend") {
      if (organizations[organization]) {
        applyDividends(organizations[organization], tradeCompany, dividend);
        alert(
          `New funds for ${organization}: ${organizations[organization].funds}`
        );
        console.log(`New funds for ${organization}: ${organizations[organization].funds}`);
      } else {
        alert("Organization not found!");
      }
    } else if (action === "split") {
      if (organizations[organization]) {
        applyStockSplit(organizations[organization], tradeCompany, splitRatio);
        alert(
          `New shares for ${tradeCompany} in ${organization}: ${organizations[organization].share[tradeCompany]}`
        );
      } else {
        alert("Organization not found!");
      }
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
                  <label>Organization of Clearing Member:</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
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
                  <label>Organization of Clearing Member:</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
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


