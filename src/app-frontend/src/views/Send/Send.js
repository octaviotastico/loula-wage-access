import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "./Send.css";
import { currency_char, formatMoney } from "../../utils/currency";

function Send() {
  const [employeeBalances, setEmployeeBalances] = useState([]);

  const navigate = useNavigate();
  const employeeId = "E01";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/balance/${employeeId}`)
      .then((response) => {
        const { balances } = response.data || [];
        setEmployeeBalances(balances);
      })
      .catch((error) => {
        console.error("Error fetching balances:", error);
      });
  }, [employeeId]);

  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [description, setDescription] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const handleSendTransfer = () => {
    const transaction = {
      senderId: employeeId, // TODO: Get the sender ID from the logged-in user
      recipientId,
      amount,
      currency,
      description,
    };

    axios
      .post("http://localhost:3000/transactions/transfer", transaction)
      .then((response) => {
        console.log("Transaction sent successfully:", response.data);
        setTransactionSuccess(true);
      })
      .catch((error) => {
        console.error("Error sending transaction:", error);
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

  if (transactionSuccess) {
    return (
      <div className="success-message">
        <h1>
          Transfer Done Successfully! <span className="done-check material-symbols-rounded">done</span>
        </h1>
        <p className="success-messages">Amount: {amount}</p>
        <p className="success-messages">Currency: {currency}</p>
        <p className="success-messages">Recipient ID: {recipientId}</p>
        <p className="success-messages">Description: {description || "Money transfer"}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  const sufficientBalance =
    !amount ||
    (currency && amount && employeeBalances.find((elem) => elem.currency === currency).amount >= Number(amount));

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
          <select
            defaultValue=""
            value={currency}
            className="currency-select"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="" disabled>
              Select a currency
            </option>
            <option>USD</option>
            <option>EUR</option>
            <option>ARS</option>
            <option>GBP</option>
          </select>
        </div>
        {/* Conditionally render balance info or error message based on sufficient balance */}
        {currency && sufficientBalance && (
          <div className="balance-info">
            <span className="material-symbols-rounded">info</span>
            <span>
              Your balance in {currency} is {currency_char[currency]}
              {formatMoney(employeeBalances.find((elem) => elem.currency === currency).amount)}
            </span>
          </div>
        )}

        {!sufficientBalance && currency && (
          <div className="balance-info error">
            <span className="material-symbols-rounded">error</span>
            <span>Insufficient funds</span>
          </div>
        )}
      </section>

      <section className="to-section">
        <label>To</label>
        <select
          defaultValue=""
          value={recipientId}
          className="to-select"
          onChange={(e) => setRecipientId(e.target.value)}
        >
          <option value="" disabled>
            Select a recipient
          </option>
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
        <button
          disabled={!amount || !recipientId || !currency || !sufficientBalance}
          className={`send-button ${!amount || !recipientId || !currency || !sufficientBalance ? "disabled" : ""}`}
          onClick={handleSendTransfer}
        >
          Send <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </section>
    </div>
  );
}

export default Send;
