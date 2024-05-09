// Library
import React from 'react';

// Local Components
import Balance from '../Balance';
import './BalanceList.css';

const BalanceList = ({ balances, loading, error }) => {
  if (!balances.length) {
    console.log("1111111111");
    return (
      <section className="balances">
        <h3>Loading your balances</h3>
        <div className="balance-list">
          <Balance loading={loading} error={error} />
          <Balance loading={loading} error={error} />
          <Balance loading={loading} error={error} />
          <Balance loading={loading} error={error} />
        </div>
      </section>
    );
  }

  console.log("2222222222");
  return (
    <section className="balances">
      <h3>Your balances</h3>
      <div className="balance-list">
        {balances.map((balance) => (
          <Balance key={balance.currency} balance={balance} />
        ))}
      </div>
    </section>
  );
}

export default BalanceList;
