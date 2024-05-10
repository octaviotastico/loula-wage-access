// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useTransactionsList = (employeeId, callback) => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loadingTransactionsList, setLoadingTransactionsList] = useState(true);
  const [errorTransactionsList, setErrorTransactionsList] = useState(null);

  useEffect(() => {
    setErrorTransactionsList(null);
    setLoadingTransactionsList(true);
    axios
      .get(`${API_BASE_URL}/transactions/${employeeId}`)
      .then((response) => {
        setTransactionsList(response.data || {});
        setLoadingTransactionsList(false);
        if (callback) callback(response.data || {});
      })
      .catch((errorTransactionsList) => {
        console.error("Error fetching balances:", errorTransactionsList);
        setErrorTransactionsList(errorTransactionsList);
        setLoadingTransactionsList(false);
      });
  }, [employeeId, callback]);

  return {
    transactionsList,
    // For generic loading and error handling
    loading: loadingTransactionsList,
    error: errorTransactionsList,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingTransactionsList,
    errorTransactionsList,
  };
};

export { useTransactionsList };
