INSERT INTO
  employees (employee_id, name, total_earnings, monthly_salary, salary_currency)
VALUES
  ('E01', 'Octavio', 10000.00, 5000.00, 'USD'),
  ('E02', 'Alice', 100.00, 1000.00, 'GBP'),
  ('E03', 'Bob', 5000.00, 2500.00, 'EUR');

INSERT INTO
  employee_balances (balance_id, employee_id, currency, balance)
VALUES
  ('B02', 'E01', 'EUR', 1200.00),
  ('B04', 'E01', 'GBP', 800.00),
  ('B05', 'E02', 'USD', 1500.00),
  ('B06', 'E03', 'EUR', 1200.00),
  ('B03', 'E01', 'ARS', 3250000.00),
  ('B07', 'E03', 'ARS', 250000.00),
  ('B08', 'E03', 'USD', 0.00),
  ('B01', 'E01', 'USD', 2750.00);

INSERT INTO
  transactions (transaction_id, employee_id, type, amount, currency, description, transaction_date, recipient_id, vendor)
VALUES
  (8, 'E01', 'salary_payment', 5000.00, 'USD', 'Salary', '2024-05-02 00:00:00-03', 'E01', NULL),
  (9, 'E01', 'transfer', -15.00, 'USD', 'Transfer to a friend', '2024-05-07 00:00:00-03', 'E02', NULL),
  (10, 'E01', 'spend', -60.00, 'USD', 'Book Purchase', '2024-05-05 00:00:00-03', NULL, 'store'),
  (11, 'E01', 'spend', -8500.00, 'ARS', 'Food Delivery', '2024-05-05 00:00:00-03', NULL, 'store'),
  (13, 'E01', 'spend', -1500.00, 'USD', 'Sony 70\\" TV', '2024-05-07 00:00:00-03', NULL, 'store'),
  (14, 'E01', 'spend', -750.00, 'USD', 'Playstation 5 Pro', '2024-05-07 00:00:00-03', NULL, 'store'),
  (15, 'E01', 'transfer', -250000.00, 'ARS', 'Enjoy this pesos!!', '2024-05-09 00:56:12.865813-03', 'E03', NULL),
  (12, 'E01', 'wage_advance', 2000.00, 'USD', 'Wage Advance', '2024-05-06 00:00:00-03', NULL, NULL),
  (23, 'E01', 'wage_advance', 1000.00, 'USD', 'Wage advance', '2024-05-09 06:31:24.064089-03', NULL, NULL),
  (24, 'E01', 'wage_advance', 250.00, 'USD', 'Wage advance', '2024-05-09 06:31:39.465628-03', NULL, NULL);

INSERT INTO
  currency_rates (pair, rate)
VALUES
  ('USD-ARS', 1000.0000),
  ('ARS-USD', 0.0010),
  ('USD-EUR', 0.8000),
  ('EUR-USD', 1.2000),
  ('USD-GBP', 0.7000),
  ('GBP-USD', 1.3000),
  ('ARS-EUR', 0.0008),
  ('EUR-ARS', 1250.0000),
  ('ARS-GBP', 0.0007),
  ('GBP-ARS', 1400.000),
  ('EUR-GBP', 0.8750),
  ('GBP-EUR', 1.1250);