import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "./Advances.css";
import { currency_symbols, formatMoney } from "../../utils/currency";
import { formatDateWithDay } from "../../utils/dates";

const Advances = () => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [askedAdvances, setAskedAdvances] = useState([]);
  const [availableAmount, setAvailableAmount] = useState({});
  const [amount, setAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const navigate = useNavigate();
  const employeeId = "E01";

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/general/${employeeId}`);
        setCurrency(response.data.salary_currency);
        setEmployeeInfo(response.data);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    fetchEmployeeInfo();
  }, [employeeId]);

  useEffect(() => {
    const fetchAdvances = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/advance/requested/${employeeId}`);
        setAskedAdvances(response.data);
      } catch (error) {
        console.error("Error fetching advances:", error);
      }
    };

    fetchAdvances();
  }, [employeeId]);

  useEffect(() => {
    const fetchAvailableAmount = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/advance/available/${employeeId}`);
        setAvailableAmount(response.data);
      } catch (error) {
        console.error("Error fetching available amount:", error);
      }
    };

    fetchAvailableAmount();
  }, [employeeId]);

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);
    setFormattedAmount(inputAmount); // Keep both states in sync when typing
  };

  const formatAmount = () => {
    if (!amount) return;
    const number = Number(amount.replace(/[^0-9.-]+/g, ""));
    setFormattedAmount(new Intl.NumberFormat("en-US", { style: "currency", currency }).format(number));
  };

  const unformatAmount = () => {
    setFormattedAmount(amount);
  };

  const handleAskNewAdvancement = async () => {
    const payload = { advanceAmount: parseFloat(amount), currency };

    try {
      const response = await axios.post(`http://localhost:3000/advance/request/${employeeId}`, payload);
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
        <p className="success-messages">Amount: {amount}</p>
        <p className="success-messages">Currency: {currency}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="advances">
      <h2>Available advances for you</h2>
      <h2>
        Your monthly salary is: {currency_symbols[employeeInfo.salary_currency]}{" "}
        {formatMoney(employeeInfo.monthly_salary)}
      </h2>
      <div>
        {askedAdvances.length === 0 ? (
          <p>You have not requested any advances this month.</p>
        ) : (
          <div>
            <h3>Requested Advances</h3>
            <ul>
              {askedAdvances.map((advance) => (
                <li key={advance.transaction_id}>
                  <p>
                    {formatDateWithDay(advance.transaction_date)} {currency_symbols[advance.currency]}{" "}
                    {formatMoney(advance.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h3>
        You have left {currency_symbols[availableAmount.currency]}
        {formatMoney(availableAmount.availableAdvance)}
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
        {Number(amount) > Number(availableAmount.availableAdvance) && (
          <div className="balance-info error">
            <span className="material-symbols-rounded">error</span>
            <span>Insufficient funds</span>
          </div>
        )}
      </section>
      <section className="send-section">
        <button
          disabled={!amount || !currency || !Number(availableAmount.availableAdvance) >= Number(amount)}
          className={`send-button ${
            !amount || !currency || !Number(availableAmount.availableAdvance) >= Number(amount) ? "disabled" : ""
          }`}
          onClick={handleAskNewAdvancement}
        >
          Send <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </section>
    </div>
  );
};

export default Advances;
