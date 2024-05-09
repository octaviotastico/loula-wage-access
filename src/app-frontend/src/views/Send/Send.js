import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Send.css";
import { currency_char, formatMoney } from "../../utils/currency";
import { useEmployeeBalances } from "./hooks"; // Ensure this hook is properly defined as shown earlier
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Send() {
  const navigate = useNavigate();
  const employeeId = "E01";
  const { employeeBalances, loading, error } = useEmployeeBalances(employeeId);

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [description, setDescription] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value.replace(/[^0-9.-]+/g, ""));  // Immediately format input
  };

  const handleSendTransfer = async () => {
    if (!amount || !recipientId || !currency) return;
    const transaction = { senderId: employeeId, recipientId, amount: Number(amount), currency, description };
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions/transfer`, transaction);
      console.log("Transaction sent successfully:", response.data);
      setTransactionSuccess(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  if (transactionSuccess) {
    return (
      <div className="success-message">
        <h1>Transfer Done Successfully! <span className="done-check material-symbols-rounded">done</span></h1>
        <p className="success-messages">Amount: {formatMoney(amount)}</p>
        <p className="success-messages">Currency: {currency}</p>
        <p className="success-messages">Recipient ID: {recipientId}</p>
        <p className="success-messages">Description: {description || "Money transfer"}</p>
        <button className="back-button" onClick={() => navigate("/")}>Return Home</button>
      </div>
    );
  }

  const sufficientBalance = employeeBalances.find((elem) => elem.currency === currency)?.amount >= Number(amount);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="send">
      <section className="amount-section">
        <label>You will send</label>
        <div className="input-group">
          <input
            type="text"
            value={amount}
            placeholder="$100"
            className="user-input"
            onChange={handleAmountChange}
          />
          <select
            defaultValue=""
            value={currency}
            className="currency-select"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="" disabled>Select a currency</option>
            {Object.keys(currency_char).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
        {!sufficientBalance && currency && (
          <div className="balance-info error">
            <span className="material-symbols-rounded">error</span>
            <span>Insufficient funds</span>
          </div>
        )}
        {sufficientBalance && currency && (
          <div className="balance-info">
            <span className="material-symbols-rounded">info</span>
            <span>
              Your balance in {currency} is {currency_char[currency]}
              {formatMoney(employeeBalances.find((elem) => elem.currency === currency).amount)}
            </span>
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
          <option value="" disabled>Select a recipient</option>
          {/* Generate options dynamically if you have more recipients */}
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