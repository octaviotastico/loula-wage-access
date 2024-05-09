import React from 'react';

// Local Components
import { currency_images, currency_symbols, formatMoney } from '../../utils/currency';
import './Balance.css';

const Balance = ({ balance, loading, error }) => {
  if (loading || error) {
    console.log("1111111111");
    return (
      <div className="balance loading">
        <div className="currency-image-placeholder"></div>
        <div className="balance-amount-placeholder"></div>
      </div>
    );
  }

  console.log("2222222222");
  return (
    <div className="balance">
      <img src={currency_images[balance.currency]} alt={balance.currency} />
      <div className='balance-amount'>
        {currency_symbols[balance.currency]} {formatMoney(balance.amount)}
      </div>
    </div>
  );
}

export default Balance;
