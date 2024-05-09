// Libraries
import React, { useState } from "react";
import axios from "axios";

// Styles
import "./Send.css";

function Send() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [recipientId, setRecipientId] = useState("E02");
  const [description, setDescription] = useState("");

  const handleSendTransfer = () => {
    const transaction = {
      senderId: "E01", // TODO: Get the sender ID from the logged-in user
      recipientId,
      amount,
      currency,
      description
    };

    axios.post("http://localhost:3000/transactions/transfer", transaction)
      .then(response => {
        console.log("Transaction sent successfully:", response.data);
        // Show success message
      })
      .catch(error => {
        console.error("Error sending transaction:", error);
        // Show error message
      });
  }

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and at most two decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="send">
      <section className="amount-section">
        <label>You will send</label>
        <div className="input-group">
          <input type="text" value={amount} placeholder="$100" className="user-input" onChange={handleAmountChange} />
          <select value={currency} className="currency-select" onChange={(e) => setCurrency(e.target.value)}>
            <option>USD</option>
            <option>EUR</option>
            <option>ARS</option>
            <option>GBP</option>
          </select>
        </div>
        {/* Show balance here depending on selected currency */}
        <div className="balance-info">
          <span className="material-symbols-rounded">info</span>
          <span>Your balance is $1,000</span>
        </div>
      </section>

      <section className="to-section">
        <label>To</label>
        <select value={recipientId} className="to-select" onChange={(e) => setRecipientId(e.target.value)}>
          <option>User 2 (E02)</option>
          <option>User 3 (E03)</option>
        </select>
      </section>

      <section className="message-section">
        <label>Message</label>
        <textarea
          placeholder="Optional message"
          className="message-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      <section className="send-section">
        <button className="send-button" onClick={handleSendTransfer}>
          Send <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </section>
    </div>
  );
}

export default Send;
