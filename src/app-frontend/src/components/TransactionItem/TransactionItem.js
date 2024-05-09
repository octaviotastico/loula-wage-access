// Libraries
import React from "react";

// Local Components
import { formatMoney } from "../../utils/currency";
import "./TransactionItem.css";

const TransactionItem = ({ transaction }) => {
  return (
    <div className="transaction-item">
      {transaction.amount > 0 ? (
        <span className="material-symbols-rounded">arrow_downward</span>
      ) : (
        <span className="material-symbols-rounded">arrow_upward</span>
      )}
      <div>{transaction.recipient_name ? `To: ${transaction.recipient_name}` : `Spent on: ${transaction.vendor}`}</div>
      <div>{transaction.description}</div>
      <div>{new Date(transaction.transaction_date).toLocaleDateString()}</div>
      <div>Type {transaction.type}</div>
      <div className={`${transaction.amount > 0 ? "positive-transaction" : ""}`}>
        {transaction.amount > 0 ? "+ " : ""}
        {formatMoney(Math.abs(transaction.amount))}
        {transaction.currency}
      </div>
    </div>
  );
};

export default TransactionItem;
