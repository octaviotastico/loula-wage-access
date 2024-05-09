import axios from 'axios';
import { useState, useEffect } from 'react';

const useEmployeeData = (employeeId) => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/general/${employeeId}`);
        setEmployeeInfo(response.data);
        setCurrency(response.data.salary_currency);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    fetchEmployeeInfo();
  }, [employeeId]);

  return [employeeInfo, currency, setCurrency];
};

const useAdvanceData = (employeeId) => {
  const [askedAdvances, setAskedAdvances] = useState([]);
  const [availableAmount, setAvailableAmount] = useState({});

  useEffect(() => {
    const fetchAdvances = async () => {
      try {
        const advResponse = await axios.get(`http://localhost:3000/advance/requested/${employeeId}`);
        const availResponse = await axios.get(`http://localhost:3000/advance/available/${employeeId}`);
        setAskedAdvances(advResponse.data);
        setAvailableAmount(availResponse.data);
      } catch (error) {
        console.error("Error fetching advances data:", error);
      }
    };

    fetchAdvances();
  }, [employeeId]);

  return [askedAdvances, availableAmount];
};

export { useEmployeeData, useAdvanceData };
