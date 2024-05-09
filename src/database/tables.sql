CREATE TABLE employees (
    employee_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    current_balance DECIMAL(10, 2) NOT NULL,
    total_earnings DECIMAL(10, 2) NOT NULL,
    monthly_salary DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL
);

CREATE TABLE wage_access_requests (
    request_id VARCHAR(10) PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    requested_amount DECIMAL(10, 2) NOT NULL,
    requested_currency VARCHAR(10) NOT NULL,
    request_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


CREATE TABLE currency_rates (
    pair VARCHAR(10) PRIMARY KEY,
    rate DECIMAL(10, 4) NOT NULL
);
