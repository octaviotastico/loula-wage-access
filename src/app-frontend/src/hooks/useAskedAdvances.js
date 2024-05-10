// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useAskedAdvances = (employeeId) => {
  const [askedAdvances, setAskedAdvances] = useState([]);
  const [loadingAskedAdvances, setLoadingAskedAdvaces] = useState(true);
  const [errorAskedAdvances, setErrorAskedAdvances] = useState(null);

  useEffect(() => {
    setErrorAskedAdvances(null);
    setLoadingAskedAdvaces(true);
    axios
      .get(`${API_BASE_URL}/advance/requested/${employeeId}`)
      .then((response) => {
        setAskedAdvances(response.data || []);
        setLoadingAskedAdvaces(false);
      })
      .catch((errorAskedAdvances) => {
        console.error("Error fetching asked advances:", errorAskedAdvances);
        setErrorAskedAdvances(errorAskedAdvances);
        setLoadingAskedAdvaces(false);
      });
  }, [employeeId]);

  return {
    askedAdvances,
    // For generic loading and error handling
    loading: loadingAskedAdvances,
    error: errorAskedAdvances,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingAskedAdvances,
    errorAskedAdvances,
  };
};

export { useAskedAdvances };
