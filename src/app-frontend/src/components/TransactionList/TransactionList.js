// Libraries
import React from "react";

// Local Components
import TransactionItem from "../TransactionItem";
import "./TransactionList.css";

const TransactionList = ({ transactions, loading, error }) => {
  if (!transactions.length) {
    console.log("1111111111");

    return (
      <section className="transactions">
        <h3>Loading your recent transactions</h3>
        <div className="transaction-list">
          <TransactionItem loading={loading} error={error} />
          <TransactionItem loading={loading} error={error} />
          <TransactionItem loading={loading} error={error} />
          <TransactionItem loading={loading} error={error} />
          <TransactionItem loading={loading} error={error} />
        </div>
      </section>
    );
  }

  console.log("2222222222");
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
