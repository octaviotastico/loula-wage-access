// Libraries
import React from "react";

// Local Components
import TransactionItem from "../TransactionItem";
import "./TransactionList.css";

const TransactionList = ({ transactions, loading, error, showTitle = true }) => {
  const renderPlaceholderItems = () => {
    const placeholders = Array.from({ length: 5 }, (_, index) => (
      <TransactionItem key={`placeholder-${index}`} loading={loading} error={error} />
    ));
    return <>{placeholders}</>;
  };

  return (
    <section className="transactions">
      {showTitle && <h3>{!transactions.length ? "Loading your recent transactions" : "Recent Transactions"}</h3>}
      <div className="transaction-list">
        {!transactions.length ? renderPlaceholderItems() : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.transaction_id} transaction={transaction} />
          ))
        )}
      </div>
    </section>
  );
};

export default TransactionList;