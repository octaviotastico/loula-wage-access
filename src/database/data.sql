INSERT INTO
  employees (employee_id, name, current_balance, total_earnings, monthly_salary, currency)
VALUES
  ('E01', 'Octavio', 2300, 10000, 5000, 'USD'),
  ('E02', 'Alice', 100, 100, 1000, 'ARS'),
  ('E03', 'Bob', 2000000, 5000000, 2500000, 'USD');

INSERT INTO
  wage_access_requests (request_id, employee_id, requested_amount, requested_currency)
VALUES
  ('WR01', 'E01', 100, 'USD'),
  ('WR02', 'E02', 500, 'ARS'),
  ('WR03', 'E03', 50, 'USD');

INSERT INTO
  currency_rates (pair, rate)
VALUES
  ('USD-ARS', 1000),
  ('ARS-USD', 0.001);