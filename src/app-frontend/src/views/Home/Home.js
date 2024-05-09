// Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Local Components
import Actions from "../../components/Actions";
import BalanceList from "../../components/BalanceList";
import LeftNav from "../../components/LeftNav";
import TransactionList from "../../components/TransactionList";

// Styles
import "./Home.css";

function Home() {
  const [employeeBalances, setEmployeeBalances] = useState([]);
  const [transactionsInfo, setTransactionsInfo] = useState([]);

  const employeeId = "E01";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/balance/${employeeId}`)
      .then((response) => {
        const { balances } = response.data || [];
        setEmployeeBalances(balances);
      })
      .catch((error) => {
        console.error("Error fetching balances:", error);
      });
  }, [employeeId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/transactions/${employeeId}`)
      .then((response) => {
        setTransactionsInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching balances:", error);
      });
  }, [employeeId]);

  return (
    <div className="home">
      <LeftNav balances={employeeBalances} />
      <section className="home-content">
        <div className="content-wrapper">
          <Actions />
          <BalanceList balances={employeeBalances} />
          <TransactionList transactions={transactionsInfo} />
        </div>
      </section>
    </div>
  );
}

export default Home;
