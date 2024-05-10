// Library
import React from 'react';

// Local Components
import Balance from '../Balance';
import './BalanceList.css';

const BalanceList = ({ balances, loading, error }) => {
  const renderPlaceholderBalances = () => {
    const placeholders = Array.from({ length: 4 }, (_, index) => (
      <Balance key={`placeholder-${index}`} loading={loading} error={error} />
    ));
    return <>{placeholders}</>;
  };

  return (
    <section className="balances">
      <h3>{!balances.length ? "Loading your balances" : "Your balances"}</h3>
      <div className="balance-list">
        {!balances.length ? renderPlaceholderBalances() : (
          balances.map((balance) => (
            <Balance key={balance.currency} balance={balance} />
          ))
        )}
      </div>
    </section>
  );
}

export default BalanceList;