-- Saving these queries here to not loose them when closing pgAdmin4.
-- They're not important, just some queries to test the database schema.

CREATE TABLE employees (
    employee_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    current_balance DECIMAL(10, 2) NOT NULL,
    total_earnings DECIMAL(10, 2) NOT NULL,
    monthly_salary DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL
);



-- Update
ALTER TABLE employees DROP COLUMN current_balance;
ALTER TABLE employees DROP COLUMN currency;

-- New table xD
CREATE TABLE employee_balances (
    balance_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);



CREATE TABLE wage_access_requests (
    request_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    requested_amount DECIMAL(10, 2) NOT NULL,
    requested_currency VARCHAR(10) NOT NULL,
    request_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE salary_advances (
    advance_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    advance_amount DECIMAL(10, 2) NOT NULL,
    advance_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'spend' or 'transfer'
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    description TEXT,  -- Details about the transaction
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    recipient_id VARCHAR(10),  -- For transfers, null for spends
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (recipient_id) REFERENCES employees(employee_id)
);

ALTER TABLE transactions
ADD COLUMN vendor VARCHAR(255); -- Vendor column for non-employee transactions :)

ALTER TABLE transactions
ALTER COLUMN recipient_id DROP NOT NULL;


CREATE TABLE currency_rates (
    pair VARCHAR(10) PRIMARY KEY,
    rate DECIMAL(10, 4) NOT NULL
);

---------------------------------------------------------------------

INSERT INTO
  employees (employee_id, name, total_earnings, monthly_salary, salary_currency)
VALUES
  ('E01', 'Octavio', 10000, 5000, 'USD'),
  ('E02', 'Alice', 100, 1000, 'ARS'),
  ('E03', 'Bob', 5000, 2500, 'USD');

-- ALTER TABLE employees
-- ADD COLUMN salary_currency VARCHAR(10);

INSERT INTO
  currency_rates (pair, rate)
VALUES
  ('USD-ARS', 1000),
  ('ARS-USD', 0.001);
 
INSERT INTO
  employee_balances (balance_id, employee_id, currency, balance)
VALUES
  ('B01', 'E01', 'USD', 1500),
  ('B02', 'E01', 'EUR', 1200),
  ('B03', 'E01', 'ARS', 3500000),
  ('B04', 'E01', 'GBP', 800),
  ('B05', 'E02', 'USD', 1500),
  ('B06', 'E03', 'EUR', 1200);
  

select * from employees
select * from employees join employee_balances on employees.employee_id = employee_balances.employee_id;


SELECT 
    e.employee_id,
    e.name,
    e.total_earnings,
    e.monthly_salary,
    json_agg(
        json_build_object(
            'currency', b.currency,
            'amount', b.balance
        )
    ) AS balances
FROM 
    employees e
JOIN 
    employee_balances b ON e.employee_id = b.employee_id
GROUP BY 
    e.employee_id, e.name, e.total_earnings, e.monthly_salary;


select * from transactions where employee_id = 'E01';
SELECT
        t.transaction_id,
        t.type,
        t.amount,
        t.currency,
        t.description,
        t.transaction_date,
		t.vendor,
        e.name AS recipient_name
      FROM
        transactions t
      LEFT JOIN
        employees e ON t.recipient_id = e.employee_id
      WHERE
        t.employee_id = 'E01'
      ORDER BY
        t.transaction_date DESC;

INSERT INTO
  transactions (employee_id, type, amount, currency, description, transaction_date, recipient_id)
VALUES
  ('E01', 'salary_payment', '5000', 'USD', 'Salary', '2024-05-02', 'E01'),
  ('E01', 'transfer', '-15', 'USD', 'Transfer to a friend', '2024-05-07', 'E02');

INSERT INTO
  transactions (employee_id, type, amount, currency, description, transaction_date, vendor)
VALUES
  ('E01', 'spend', '-60', 'USD', 'Book Purchase', '2024-05-05', '1234321'),
  ('E01', 'spend', '-8500', 'ARS', 'Food Delivery', '2024-05-05', '1234321'),
  ('E01', 'wage_access', '2000', 'USD', 'Wage Advance', '2024-05-06', '1234321'),
  ('E01', 'spend', '-1500', 'USD', 'Sony 70" TV', '2024-05-07', '1234321'),
  ('E01', 'spend', '-750', 'USD', 'Playstation 5 Pro', '2024-05-07', '1234321');


select * from employees

select * from wage_access_requests

select * from currency_rates




select * from salary_advances








select * from transactions



----------------------------------------------------------------

