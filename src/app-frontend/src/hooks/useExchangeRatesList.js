// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useExchangeRatesList = (callback) => {
  const [exchangeRatesList, setExchangeRatesList] = useState([]);
  const [loadingExchangeRatesList, setLoadingExchangeRatesList] = useState(true);
  const [errorExchangeRatesList, setErrorExchangeRatesList] = useState(null);

  useEffect(() => {
    setErrorExchangeRatesList(null);
    setLoadingExchangeRatesList(true);
    axios
      .get(`${API_BASE_URL}/exchange/rates`)
      .then((response) => {
        setExchangeRatesList(response.data || []);
        setLoadingExchangeRatesList(false);
        if (callback) callback(response.data || []);
      })
      .catch((errorExchangeRatesList) => {
        console.error("Error fetching balances:", errorExchangeRatesList);
        setErrorExchangeRatesList(errorExchangeRatesList);
        setLoadingExchangeRatesList(false);
      });
  }, [callback]);

  return {
    exchangeRatesList,
    // For generic loading and error handling
    loading: loadingExchangeRatesList,
    error: errorExchangeRatesList,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingExchangeRatesList,
    errorExchangeRatesList,
  };
};

export { useExchangeRatesList };
