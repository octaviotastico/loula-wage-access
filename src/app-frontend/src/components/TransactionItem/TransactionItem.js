import React from "react";

// Local Components
import { formatMoney } from "../../utils/currency";
import { formatDateWithDay } from "../../utils/dates";
import "./TransactionItem.css";

const TransactionItem = ({ transaction, loading, error }) => {
  if (loading || error) {
    return (
      <div className="transaction-item loading">
        <div className="transaction-icon-placeholder"></div>
        <div className="transaction-item-info">
          <div className="transaction-info-placeholder"></div>
          <div className="transaction-description-placeholder"></div>
        </div>
        <div className="transaction-amount-placeholder"></div>
      </div>
    );
  }

  return (
    <div className="transaction-item">
      <div className="transaction-icon">
        {transaction.amount > 0 ? (
          <span className="material-symbols-rounded">arrow_downward</span>
        ) : (
          <span className="material-symbols-rounded">arrow_upward</span>
        )}
        {transaction.type === "wage_advance" && <span className="material-symbols-rounded">paid</span>}
      </div>

      <section className="transaction-item-info">
        <div>
          {transaction.recipient_name && `Transfer to: ${transaction.recipient_name} - `}
          {transaction.vendor && `Spent on: ${transaction.vendor} - `}
          {<span className="transaction-date">{formatDateWithDay(transaction.transaction_date)}</span>}
        </div>
        <div className="transaction-description">{transaction.description}</div>
      </section>

      <div className={`${transaction.amount > 0 ? "positive-transaction" : ""}`}>
        {transaction.amount > 0 ? "+ " : ""} {formatMoney(Math.abs(transaction.amount))} {transaction.currency}
      </div>
    </div>
  );
};

export default TransactionItem;
