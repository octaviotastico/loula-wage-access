// Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Local Components
import TransactionList from "../../components/TransactionList";
import { currency_symbols, formatMoney } from "../../utils/currency";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import { useAvailableAdvance } from "../../hooks/useAvailableAdvance";
import { useAskedAdvances } from "../../hooks/useAskedAdvances";
import { API_BASE_URL } from "../../utils/constants";
import "./Advances.css";

const Advances = () => {
  const employeeId = "E01";
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const { employeeInfo, loadingEmployeeData } = useEmployeeData(employeeId, (data) => setSelectedCurrency(data.salary_currency));
  const { askedAdvances, loadingAskedAdvances, errorAskedAdvances } = useAskedAdvances(employeeId);
  const { availableAmount, loadingAvailableAmount, errorAvailableAmount } = useAvailableAdvance(employeeId);

  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);
    setFormattedAmount(inputAmount);
  };

  const formatAmount = () => {
    const number = Number(amount.replace(/[^0-9.-]+/g, ""));
    setFormattedAmount(new Intl.NumberFormat("en-US", { style: "currency", selectedCurrency }).format(number));
  };

  const unformatAmount = () => {
    setFormattedAmount(amount);
  };

  const handleAskNewAdvancement = async () => {
    const payload = { advanceAmount: parseFloat(amount), selectedCurrency };
    try {
      const response = await axios.post(`${API_BASE_URL}/advance/request/${employeeId}`, payload);
      console.log("Transaction sent successfully:", response.data);
      setTransactionSuccess(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  if (transactionSuccess) {
    return (
      <div className="success-message">
        <h1>
          Advance Asked Successfully! <span className="done-check material-symbols-rounded">done</span>
        </h1>
        <p className="success-messages">Amount: {formattedAmount}</p>
        <p className="success-messages">Currency: {selectedCurrency}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <section className="advances">
      <div className="advances-container">
        <h1 className="advances-title">Available advances for you</h1>
        <h2>
          Your monthly salary is:{" "}
          {loadingEmployeeData ? (
            <div className="advance-item loading">
              <div className="advance-amount-placeholder"></div>
            </div>
          ) : (
            `${currency_symbols[employeeInfo.salary_currency]} ${formatMoney(employeeInfo.monthly_salary)}`
          )}
        </h2>
        <div>
          <div>
            <h3 className="advances-subtitles">
              Requested Advances{" "}
              <span className="tooltip-container">
                <span className="material-symbols-rounded">info</span>
                <span className="tooltip-text">These are all the advances you have requested this month.</span>
              </span>
            </h3>

            <TransactionList transactions={askedAdvances} showTitle={false} loading={loadingAskedAdvances} error={errorAskedAdvances} />
          </div>
        </div>

        <h3 className="advances-subtitles">
          You have left{" "}
          {loadingAvailableAmount ? (
            <div className="advance-item loading">
              <div className="advance-amount-placeholder"></div>
            </div>
          ) : (
            `${currency_symbols[availableAmount.currency]} ${formatMoney(availableAmount.availableAdvance)}`
          )}

          {errorAvailableAmount && (
            <div className="balance-info error">
              <span className="material-symbols-rounded">error</span>
              <span>Error loading available advance</span>
            </div>
          )}

          <span className="tooltip-container">
            <span className="material-symbols-rounded">info</span>
            <span className="tooltip-text">
              This means you can now ask up to {currency_symbols[availableAmount.currency]}{" "}
              {formatMoney(availableAmount.availableAdvance)} in advance until next month.
            </span>
          </span>
        </h3>

        <section className="amount-section">
          <label>Advance</label>
          <div className="input-group">
            <input
              type="text"
              value={formattedAmount}
              placeholder="$1000"
              className="user-input"
              onChange={handleAmountChange}
              onBlur={formatAmount}
              onFocus={unformatAmount}
            />
            <select value={selectedCurrency} className="currency-select" onChange={(e) => setSelectedCurrency(e.target.value)}>
              <option value="" disabled>
                Select a currency
              </option>
              <option>USD</option>
              <option>EUR</option>
              <option>ARS</option>
              <option>GBP</option>
            </select>
          </div>
          {Number(amount) > Number(availableAmount.availableAdvance) && (
            <div className="balance-info error">
              <span className="material-symbols-rounded">error</span>
              <span>Insufficient funds</span>
            </div>
          )}
        </section>
        <section className="send-section">
          <button
            disabled={!amount || !selectedCurrency || Number(amount) > Number(availableAmount.availableAdvance)}
            className={`send-button ${
              !amount || !selectedCurrency || Number(amount) > Number(availableAmount.availableAdvance) ? "disabled" : ""
            }`}
            onClick={handleAskNewAdvancement}
          >
            Get advance <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </section>
      </div>
    </section>
  );
};

export default Advances;
