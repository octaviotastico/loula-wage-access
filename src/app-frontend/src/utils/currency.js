export const currency_images = {
  "USD": "/usd.svg",
  "EUR": "/eur.svg",
  "ARS": "/ars.svg",
  "GBP": "/gbp.svg",
}

export const currency_symbols = {
  "USD": "USD $",
  "EUR": "EURO €",
  "ARS": "ARS $",
  "GBP": "GBP £",
}

export const currency_char = {
  "USD": "$",
  "EUR": "€",
  "ARS": "$",
  "GBP": "£",
}

export const formatMoney = (amount) => {
  let parts = Number(amount).toFixed(2).split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1];

  // Add period every three digits to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Return the formatted amount
  return `${integerPart},${decimalPart}`;
}