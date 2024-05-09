// Library
import React from 'react';

// Local Components
import Balance from '../Balance';
import './BalanceList.css';

const BalanceList = ({ balances }) => {
  return (
    <section className="balances">
      <h3>Your balances</h3>
      <div className="balance-list">
        {balances.length && balances.map((balance) => (
          <Balance key={balance.currency} balance={balance} />
        ))}
      </div>
    </section>
  );
}

export default BalanceList;
