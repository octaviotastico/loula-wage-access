// Libraries
import React from "react";

// Local Components
import TransactionItem from "../TransactionItem";
import "./TransactionList.css";

const TransactionList = ({ transactions, loading, error, showTitle = true }) => {
  if (!transactions.length) {

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

  return (
    <section className="transactions">
      {showTitle && <h3>Recent Transactions</h3>}
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.transaction_id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
};

export default TransactionList;
