-- Table for employee info
CREATE TABLE IF NOT EXISTS public.employees
(
    employee_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    total_earnings numeric(10,2) NOT NULL,
    monthly_salary numeric(10,2) NOT NULL,
    salary_currency character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT employees_pkey PRIMARY KEY (employee_id)
);
-- CREATE TABLE employees (
--     employee_id VARCHAR(10) PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     current_balance DECIMAL(10, 2) NOT NULL,
--     total_earnings DECIMAL(10, 2) NOT NULL,
--     monthly_salary DECIMAL(10, 2) NOT NULL,
--     currency VARCHAR(10) NOT NULL
-- );

-- Balances for each currency (separated to prevent repeated info)
CREATE TABLE IF NOT EXISTS public.employee_balances
(
    balance_id character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT nextval('employee_balances_balance_id_seq'::regclass),
    employee_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    currency character varying(10) COLLATE pg_catalog."default" NOT NULL,
    balance numeric(10,2) NOT NULL,
    CONSTRAINT employee_balances_pkey PRIMARY KEY (balance_id),
    CONSTRAINT employee_balances_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.employees (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
-- CREATE TABLE employee_balances (
--     balance_id VARCHAR(10) NOT NULL DEFAULT 'auto_increment_value',
--     employee_id VARCHAR(10) NOT NULL,
--     currency VARCHAR(10) NOT NULL,
--     balance DECIMAL(10, 2) NOT NULL,
--     PRIMARY KEY (balance_id),
--     FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
-- );

-- Table for all employee transactions
CREATE TABLE IF NOT EXISTS public.transactions
(
    transaction_id integer NOT NULL DEFAULT nextval('transactions_transaction_id_seq'::regclass),
    employee_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying(10) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    transaction_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    recipient_id character varying(10) COLLATE pg_catalog."default",
    vendor character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
    CONSTRAINT transactions_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.employees (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT transactions_recipient_id_fkey FOREIGN KEY (recipient_id)
        REFERENCES public.employees (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
-- CREATE TABLE transactions (
--     transaction_id INTEGER NOT NULL DEFAULT 'auto_increment_value', -- Adjust this default value based on your DBMS
--     employee_id VARCHAR(10) NOT NULL,
--     type VARCHAR(50) NOT NULL,
--     amount DECIMAL(10, 2) NOT NULL,
--     currency VARCHAR(10) NOT NULL,
--     description TEXT,
--     transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     recipient_id VARCHAR(10),
--     vendor VARCHAR(255),
--     PRIMARY KEY (transaction_id),
--     FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
--     FOREIGN KEY (recipient_id) REFERENCES employees(employee_id)
-- );

-- Table for currency exchange rates
CREATE TABLE IF NOT EXISTS public.currency_rates
(
    pair character varying(10) COLLATE pg_catalog."default" NOT NULL,
    rate numeric(10,4) NOT NULL,
    CONSTRAINT currency_rates_pkey PRIMARY KEY (pair)
);
-- CREATE TABLE currency_rates (
--     pair VARCHAR(10) PRIMARY KEY,
--     rate DECIMAL(10, 4) NOT NULL
-- );