// Library
import React from "react";

// Local Components
import ExchangeRate from "../ExchangeRate";
import "./ExchangeRateList.css";

const ExchangeRateList = ({ exchangeRate, loading, error }) => {
  if (!exchangeRate.length) {
    return (
      <section>
        <h3>Loading current exchange rates</h3>
        <div className="exchange-rate-list">
          <ExchangeRate loading={loading} error={error} />
          <ExchangeRate loading={loading} error={error} />
          <ExchangeRate loading={loading} error={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="exchange-rate-section">
      <h3>Current exchange rates</h3>
      <div className="exchange-rate-list">
        {exchangeRate.map((exchangeRate) => (
          <ExchangeRate key={exchangeRate.currency} exchangeRate={exchangeRate} />
        ))}
      </div>
    </section>
  );
};

export default ExchangeRateList;
