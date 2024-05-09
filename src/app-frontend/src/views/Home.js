// Libraries
import React from 'react';

// Local Components
import Actions from '../components/Actions';
import BalanceList from '../components/BalanceList';
import LeftNav from '../components/LeftNav';
import TransactionList from '../components/TransactionList';

// Styles
import "./Home.css";

function Home() {
  const balances = [
    { currency: 'USD', amount: '1,500' },
    { currency: 'EUR', amount: '1,200' },
    { currency: 'ARS', amount: '1,500,000' },
    { currency: 'GBP', amount: '800' }
  ];

  const transactions = [
    { date: '2024-05-07', description: 'Playstation 5 Pro', amount: '-750', currency: 'USD' },
    { date: '2024-05-07', description: 'Sony 70" TV', amount: '-1500', currency: 'USD' },
    { date: '2024-05-06', description: 'Wage Advance', amount: '2000', currency: 'USD' },
    { date: '2024-05-05', description: 'Food Delivery', amount: '-8500', currency: 'ARS' },
    { date: '2024-05-05', description: 'Book Purchase', amount: '-60', currency: 'EUR' },
    { date: '2024-05-02', description: 'Salary', amount: '5000', currency: 'USD' }
  ];

  return (
    <div className="home">
      <LeftNav balances={balances} />
      <section className='home-content'>
        <Actions />
        <BalanceList balances={balances} />
        <TransactionList transactions={transactions} />
      </section>
    </div>
  );
}

export default Home;
