// Library
import React from 'react';

// Local Components
import ExchangeRate from '../ExchangeRate';
import './ExchangeRateList.css';

const ExchangeRateList = ({ exchangeRate, loading, error }) => {
  if (!exchangeRate.length) {
    return (
      <section className="exchangeRate">
        <h3>Loading your exchangeRate</h3>
        <div className="balance-list">
          <ExchangeRate loading={loading} error={error} />
          <ExchangeRate loading={loading} error={error} />
          <ExchangeRate loading={loading} error={error} />
          <ExchangeRate loading={loading} error={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="exchangeRate">
      <h3>Your exchangeRate</h3>
      <div className="balance-list">
        {exchangeRate.map((balance) => (
          <ExchangeRate key={balance.currency} balance={balance} />
        ))}
      </div>
    </section>
  );
}

export default ExchangeRateList;
