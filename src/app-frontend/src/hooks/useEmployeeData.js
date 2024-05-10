// Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Local Components
import { API_BASE_URL } from "../utils/constants";

const useEmployeeData = (employeeId, callback) => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [loadingEmployeeData, setLoadingEmployeeData] = useState(true);
  const [errorEmployeeData, setErrorEmployeeData] = useState(null);

  useEffect(() => {
    setErrorEmployeeData(null);
    setLoadingEmployeeData(true);
    axios
      .get(`${API_BASE_URL}/employee/general/${employeeId}`)
      .then((response) => {
        setEmployeeInfo(response.data || {});
        setLoadingEmployeeData(false);
        if (callback) callback(response.data || {});
      })
      .catch((errorEmployeeData) => {
        console.error("Error fetching balances:", errorEmployeeData);
        setErrorEmployeeData(errorEmployeeData);
        setLoadingEmployeeData(false);
      });
  }, [employeeId, callback]);

  return {
    employeeInfo,
    // For generic loading and error handling
    loading: loadingEmployeeData,
    error: errorEmployeeData,
    // For specific loading handling (if there are multiple loading states in the component)
    loadingEmployeeData,
    errorEmployeeData,
  };
};

export { useEmployeeData };
