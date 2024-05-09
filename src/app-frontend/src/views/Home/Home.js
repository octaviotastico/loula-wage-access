// Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Local Components
import Actions from '../../components/Actions';
import BalanceList from '../../components/BalanceList';
import LeftNav from '../../components/LeftNav';
import TransactionList from '../../components/TransactionList';

// Styles
import "./Home.css";

function Home() {
  const [employeeInfo, setEmployeeInfo] = useState([]);

  const employeeId = 'E01';

  useEffect(() => {
    axios.get(`http://localhost:3000/balance/${employeeId}`)
      .then(response => {
        setEmployeeInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching balances:', error);
      });
  }, [employeeId]);

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
      <LeftNav balances={employeeInfo.balances || []} />
      <section className='home-content'>
        <Actions />
        <BalanceList balances={employeeInfo.balances || []} />
        <TransactionList transactions={transactions} />
      </section>
    </div>
  );
}

export default Home;
