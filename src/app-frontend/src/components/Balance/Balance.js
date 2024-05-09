import React from 'react';
import { currency_images, currency_symbols } from '../../utils/currency';
import './Balance.css';

function Balance({ balance }) {
  return (
    <div className="balance">
      <img src={currency_images[balance.currency]} alt={balance.currency} />
      <div className='balance-amount'>
        {currency_symbols[balance.currency]} {balance.amount}
      </div>
    </div>
  );
}

export default Balance;
