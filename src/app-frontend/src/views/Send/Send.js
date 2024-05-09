import React, { useEffect, useState } from "react";
import axios from "axios";

// Styles
import "./Send.css";
import { currency_char, formatMoney } from "../../utils/currency";

function Send() {
  const [employeeInfo, setEmployeeInfo] = useState([]);

  const employeeId = "E01";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/balance/${employeeId}`)
      .then((response) => {
        setEmployeeInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching balances:", error);
      });
  }, [employeeId]);

  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [recipientId, setRecipientId] = useState("E02");
  const [description, setDescription] = useState("");

  const handleSendTransfer = () => {
    const transaction = {
      senderId: "E01", // TODO: Get the sender ID from the logged-in user
      recipientId,
      amount,
      currency,
      description,
    };

    axios
      .post("http://localhost:3000/transactions/transfer", transaction)
      .then((response) => {
        console.log("Transaction sent successfully:", response.data);
        // Show success message
      })
      .catch((error) => {
        console.error("Error sending transaction:", error);
        // Show error message
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setFormattedAmount(e.target.value); // Keep both states in sync when typing
  };

  const formatAmount = () => {
    if (!amount) return;
    const number = Number(amount.replace(/[^0-9.-]+/g, "")); // Convert to a number by removing any non-numeric characters
    setFormattedAmount(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(number)
    );
  };

  const unformatAmount = () => {
    setFormattedAmount(amount); // Reset to plain number when focused
  };

  return (
    <div className="send">
      <section className="amount-section">
        <label>You will send</label>
        <div className="input-group">
          <input
            type="text"
            value={formattedAmount}
            placeholder="$100"
            className="user-input"
            onChange={handleAmountChange}
            onBlur={formatAmount}
            onFocus={unformatAmount}
          />
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
          <span>
            Your balance in {currency} is {currency_char[currency]}
            {formatMoney(employeeInfo.balances?.find((elem) => elem.currency === currency).amount)}
          </span>
        </div>
      </section>

      <section className="to-section">
        <label>To</label>
        <select value={recipientId} className="to-select" onChange={(e) => setRecipientId(e.target.value)}>
          <option value="E02">User 2 (E02)</option>
          <option value="E03">User 3 (E03)</option>
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
