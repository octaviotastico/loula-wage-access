// Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Local Components
import Actions from "../../components/Actions";
import BalanceList from "../../components/BalanceList";
// import LeftNav from "../../components/LeftNav";
import TransactionList from "../../components/TransactionList";

// Styles
import "./Home.css";

const API_BASE_URL = "http://localhost:3000";

// Custom hook for fetching data
function useEmployeeData(employeeId) {
  const [employeeBalances, setEmployeeBalances] = useState([]);
  const [transactionsInfo, setTransactionsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const balanceResponse = await axios.get(`${API_BASE_URL}/employee/balance/${employeeId}`);
        const transactionsResponse = await axios.get(`${API_BASE_URL}/employee/transactions/${employeeId}`);

        setEmployeeBalances(balanceResponse.data.balances || []);
        setTransactionsInfo(transactionsResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [employeeId]);

  return { employeeBalances, transactionsInfo, loading, error };
}

function Home() {
  const employeeId = "E01";
  const { employeeBalances, transactionsInfo, loading, error } = useEmployeeData(employeeId);

  return (
    <div className="home">
      {/* <LeftNav balances={employeeBalances} /> */}
      <section className="home-content">
        <div className="content-wrapper">
          <Actions />
          <BalanceList balances={employeeBalances} loading={loading} error={error} />
          <TransactionList transactions={transactionsInfo} loading={loading} error={error} />
        </div>
      </section>
    </div>
  );
}

export default Home;
