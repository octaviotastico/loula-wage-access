import React from "react";
import "./TransactionItem.css";

function TransactionItem({ transaction }) {
  return (
    <div className="transaction-item">
      {transaction.amount > 0 ? (
        <span className="material-symbols-rounded">arrow_upward</span>
      ) : (
        <span className="material-symbols-rounded">arrow_downward</span>
      )}
      <div>{transaction.date}</div>
      <div>{transaction.description}</div>
      <div>
        {transaction.amount > 0 ? "+ " : ""}
        {Math.abs(transaction.amount)}
        {transaction.currency}
      </div>
    </div>
  );
}

export default TransactionItem;
