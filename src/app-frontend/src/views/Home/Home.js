// Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Local Components
// import LeftNav from "../../components/LeftNav";
import Actions from "../../components/Actions";
import BalanceList from "../../components/BalanceList";
import TransactionList from "../../components/TransactionList";
import { API_BASE_URL } from '../../utils/constants';
import "./Home.css";

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
