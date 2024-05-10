
export const isValidEmployeeId = (employeeId) => {
  // Check if employeeId matches the expected format "E" followed by digits
  const regex = /^E\d{2}$/;
  return regex.test(employeeId);
};

export const isValidCurrency = (currency) => {
  // Check if currency is one of the supported currencies
  const supportedCurrencies = ["USD", "EUR", "GBP", "ARS"];
  return supportedCurrencies.includes(currency);
};

export const isValidPair = (pair) => {
  const currencyA = pair.split("-")[0];
  const currencyB = pair.split("-")[1];

  // Check if both currencies are valid
  return isValidCurrency(currencyA) && isValidCurrency(currencyB);
}

export const isValidAmount = (amount) => {
  // Check if amount is a positive number
  return Number(amount) >= 0;
};

export const sanitizeDescription = (description) => {
  // Replace single quotes with double quotes to escape special characters
  const sanitizedDescription = description.replace(/'/g, "''");
  return sanitizedDescription;
};