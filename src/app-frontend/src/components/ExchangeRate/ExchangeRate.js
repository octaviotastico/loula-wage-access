import React from "react";

// Local Components
import { currency_images, currency_symbols } from "../../utils/currency";
import "./ExchangeRate.css";

const ExchangeRate = ({ exchangeRate, loading, error }) => {
  if (loading || error) {
    return (
      <div className="exchange-rate loading">
        <div className="currency-image-placeholder"></div>
        <div className="exchange-rate-amount-placeholder"></div>
      </div>
    );
  }

  const { pair, rate } = exchangeRate;

  const currencyA = pair.split("-")[0];
  const currencyB = pair.split("-")[1];

  return (
    <div className="exchange-rate">
      <h3 className="exchange-title">{pair}</h3>
      <div className="exchange-card">
        <div className="exchange-text-container">
          <p className="exchange-text">{currency_symbols[currencyA]}</p>
          <p className="exchange-text">{1}</p>
        </div>
        <img src={currency_images[currencyA]} alt={currencyA} className="exchange-images" />
        <div className="exchange-text-container">
          To
          <span class="material-symbols-rounded">currency_exchange</span>
        </div>
        <img src={currency_images[currencyB]} alt={currencyB} className="exchange-images" />
        <div className="exchange-text-container">
          <p className="exchange-text">{currency_symbols[currencyB]}</p>
          <p className="exchange-text">{rate}</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
