// Libraries
import React from "react";

// Local Components
import TransactionItem from "../TransactionItem";
import "./TransactionList.css";

const TransactionList = ({ transactions }) => {
  return (
    <section className="transactions">
      <h3>Recent Transactions</h3>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.transaction_id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
};

export default TransactionList;
