/*
-
- DATABASE CREATION
-
*/

-- Database for Loula Wallet
DO $$
BEGIN
    -- Check if the database exists
    IF EXISTS (SELECT FROM pg_database WHERE datname = 'loulawallet') THEN
        RAISE NOTICE 'Database loulawallet already exists, skipping creation.';
    ELSE
        -- Create the database only if it does not exist
        CREATE DATABASE loulawallet
        WITH
        OWNER = postgres
        ENCODING = 'UTF8'
        LC_COLLATE = 'C.UTF-8'
        LC_CTYPE = 'C.UTF-8'
        TABLESPACE = pg_default
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False
        TEMPLATE = template0;
    END IF;
END
$$;

/*
-
- TABLES CREATION
-
*/

-- Table for employees
CREATE TABLE IF NOT EXISTS employees (
    employee_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_earnings DECIMAL(10, 2) NOT NULL,
    monthly_salary DECIMAL(10, 2) NOT NULL,
    salary_currency VARCHAR(10)
);

-- Table for employee balances, to keep track of the balance in different currencies
CREATE TABLE employee_balances (
    balance_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Table for transactions
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recipient_id VARCHAR(10),
    vendor VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (recipient_id) REFERENCES employees(employee_id)
);

-- Table for tracking all the currency rates
CREATE TABLE currency_rates (
    pair VARCHAR(10) PRIMARY KEY,
    rate DECIMAL(10, 4) NOT NULL
);

/*
-
- DATA FOR THE TABLES
-
*/

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
