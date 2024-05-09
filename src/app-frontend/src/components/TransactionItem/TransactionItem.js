// Libraries
import React from "react";

// Local Components
import { formatMoney } from "../../utils/currency";
import "./TransactionItem.css";

const TransactionItem = ({ transaction }) => {
  const formatDateWithDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // long, short, or narrow
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="transaction-item">
      <div className="transaction-icon">
        {transaction.amount > 0 ? (
          <span className="material-symbols-rounded">arrow_downward</span>
        ) : (
          <span className="material-symbols-rounded">arrow_upward</span>
        )}
        {transaction.type === "wage_access" && <span class="material-symbols-rounded">paid</span>}
      </div>

      <section className="transaction-item-info">
        <div>
          {transaction.recipient_name && `Transfer to: ${transaction.recipient_name} - `}
          {transaction.vendor && `Spent on: ${transaction.vendor} - `}
          {<span className="transaction-date">{formatDateWithDay(transaction.transaction_date)}</span>}
        </div>
        <div className="transaction-description">{transaction.description}</div>
        {/* <div className="transaction-type">Type: {transaction.type}</div> */}
      </section>

      <div className={`${transaction.amount > 0 ? "positive-transaction" : ""}`}>
        {transaction.amount > 0 ? "+ " : ""} {formatMoney(Math.abs(transaction.amount))} {transaction.currency}
      </div>
    </div>
  );
};

export default TransactionItem;
