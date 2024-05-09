import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useEmployeeBalances = (employeeId) => {
  const [employeeBalances, setEmployeeBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios.get(`${API_BASE_URL}/employee/balance/${employeeId}`)
      .then(response => {
        setEmployeeBalances(response.data.balances || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching balances:", error);
        setError(error);
        setLoading(false);
      });
  }, [employeeId]);

  return { employeeBalances, loading, error };
};

export { useEmployeeBalances };