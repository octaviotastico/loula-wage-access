// Library
import React from "react";

// Local Components
import ExchangeRate from "../ExchangeRate";
import "./ExchangeRateList.css";

const ExchangeRateList = ({ exchangeRate, loading, error }) => {
  const renderPlaceholderRates = () => {
    const placeholders = Array.from({ length: 3 }, (_, index) => (
      <ExchangeRate key={`placeholder-${index}`} loading={loading} error={error} />
    ));
    return <>{placeholders}</>;
  };

  return (
    <section className="exchange-rate-section">
      <h3>{!exchangeRate.length ? "Loading current exchange rates" : "Current exchange rates"}</h3>
      <div className="exchange-rate-list">
        {!exchangeRate.length ? renderPlaceholderRates() : (
          exchangeRate.map((rate) => (
            <ExchangeRate key={rate.currency} exchangeRate={rate} />
          ))
        )}
      </div>
    </section>
  );
};

export default ExchangeRateList;