// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useEmployeeBalances = (employeeId) => {
  const [employeeBalances, setEmployeeBalances] = useState([]);
  const [loadingEmployeeBalance, setLoadingEmployeeBalance] = useState(true);
  const [errorEmployeeBalance, setErrorEmployeeBalance] = useState(null);

  useEffect(() => {
    setErrorEmployeeBalance(null);
    setLoadingEmployeeBalance(true);
    axios
      .get(`${API_BASE_URL}/employee/balance/${employeeId}`)
      .then((response) => {
        setEmployeeBalances(response.data.balances || []);
        setLoadingEmployeeBalance(false);
      })
      .catch((errorEmployeeBalance) => {
        console.error("Error fetching balances:", errorEmployeeBalance);
        setErrorEmployeeBalance(errorEmployeeBalance);
        setLoadingEmployeeBalance(false);
      });
  }, [employeeId]);

  return {
    employeeBalances,
    // For generic loading and error handling
    loading: loadingEmployeeBalance,
    error: errorEmployeeBalance,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingEmployeeBalance,
    errorEmployeeBalance,
  };
};

export { useEmployeeBalances };
