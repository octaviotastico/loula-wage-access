// Libraries
import React from 'react';

// Local Components
import { currency_images, currency_symbols, formatMoney } from '../../utils/currency';
import './Balance.css';

const Balance = ({ balance }) => {
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
