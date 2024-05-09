import React from 'react';
import './LeftNav.css';

function LeftNav({ balances }) {
  return (
    <nav className="left-nav">
      <h3>Your Balances</h3>
      <ul>
        {balances.map((balance, index) => (
          <li key={index}>{balance.currency}: {balance.amount}</li>
        ))}
      </ul>
    </nav>
  );
}

export default LeftNav;
