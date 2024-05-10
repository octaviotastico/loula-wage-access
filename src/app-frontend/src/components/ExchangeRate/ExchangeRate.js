import React from 'react';

// Local Components
import { currency_images, currency_symbols, formatMoney } from '../../utils/currency';
import './ExchangeRate.css';

const ExchangeRate = ({ exchangeRate, loading, error }) => {
  if (loading || error) {
    return (
      <div className="exchange-rate loading">
        <div className="currency-image-placeholder"></div>
        <div className="exchange-rate-amount-placeholder"></div>
      </div>
    );
  }

  return (
    <div className="exchangeRate">
      <img src={currency_images[exchangeRate.currency]} alt={exchangeRate.currency} />
      <div className='exchange-rate-amount'>
        {currency_symbols[exchangeRate.currency]} {formatMoney(exchangeRate.amount)}
      </div>
    </div>
  );
}

export default ExchangeRate;
