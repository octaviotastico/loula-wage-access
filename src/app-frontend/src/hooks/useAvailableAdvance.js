// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useAvailableAdvance = (employeeId) => {
  const [availableAmount, setAvailableAmount] = useState({});
  const [loadingAvailableAmount, setLoadingAvailableAmount] = useState(true);
  const [errorAvailableAmount, setErrorAvailableAmount] = useState(null);

  useEffect(() => {
    setErrorAvailableAmount(null);
    setLoadingAvailableAmount(true);
    axios
      .get(`${API_BASE_URL}/advance/available/${employeeId}`)
      .then((response) => {
        setAvailableAmount(response.data || {});
        setLoadingAvailableAmount(false);
      })
      .catch((errorAvailableAmount) => {
        console.error("Error fetching available advance:", errorAvailableAmount);
        setErrorAvailableAmount(errorAvailableAmount);
        setLoadingAvailableAmount(false);
      });
  }, [employeeId]);

  return {
    availableAmount,
    // For generic loading and error handling
    loading: loadingAvailableAmount,
    error: errorAvailableAmount,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingAvailableAmount,
    errorAvailableAmount,
  };
};

export { useAvailableAdvance };
