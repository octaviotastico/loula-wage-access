import React from 'react';
import TransactionItem from '../TransactionItem';
import './TransactionList.css';

function TransactionList({ transactions }) {
  return (
    <section className="transactions">
      <h3>Recent Transactions</h3>
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}

export default TransactionList;
