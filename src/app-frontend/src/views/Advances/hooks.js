// Libraries
import { useState, useEffect } from 'react';
import axios from 'axios';

// Local Components
import { API_BASE_URL } from '../../utils/constants';

const useEmployeeData = (employeeId) => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchEmployeeInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/employee/general/${employeeId}`);
        setEmployeeInfo(response.data);
        setCurrency(response.data.salary_currency);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee info:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [employeeId]);

  return {employeeInfo, currency, setCurrency, loading, error};
};

const useAdvanceData = (employeeId) => {
  const [askedAdvances, setAskedAdvances] = useState([]);
  const [availableAmount, setAvailableAmount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvances = async () => {
      try {
        setError(null);
        setLoading(true);
        const advResponse = await axios.get(`${API_BASE_URL}/advance/requested/${employeeId}`);
        const availResponse = await axios.get(`${API_BASE_URL}/advance/available/${employeeId}`);
        setAskedAdvances(advResponse.data);
        setAvailableAmount(availResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advances data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAdvances();
  }, [employeeId]);

  return {askedAdvances, availableAmount, loading, error};
};

export { useEmployeeData, useAdvanceData };
