// Libraries
import React from "react";

// Local Components
// import LeftNav from "../../components/LeftNav";
import Actions from "../../components/Actions";
import BalanceList from "../../components/BalanceList";
import TransactionList from "../../components/TransactionList";
import ExchangeRateList from "../../components/ExchangeRateList";
import { useTransactionsList } from "../../hooks/useTransactionList";
import { useEmployeeBalances } from "../../hooks/useEmployeeBalance";
import "./Home.css";
import { useExchangeRatesList } from "../../hooks/useExchangeRatesList";

function Home() {
  const employeeId = "E01";
  const { employeeBalances, loadingEmployeeBalance, errorEmployeeBalance } = useEmployeeBalances(employeeId);
  const { transactionsList, loadingTransactionsList, errorTransactionsList } = useTransactionsList(employeeId);
  const { exchangeRatesList, loadingExchangeRatesList, errorExchangeRatesList } = useExchangeRatesList();

  return (
    <div className="home">
      {/* <LeftNav balances={employeeBalances} /> */}
      <section className="home-content">
        <div className="content-wrapper">
          <Actions />
          <BalanceList
            balances={employeeBalances}
            loading={loadingEmployeeBalance}
            error={errorEmployeeBalance}
          />
          <TransactionList
            transactions={transactionsList}
            loading={loadingTransactionsList}
            error={errorTransactionsList}
          />
          <ExchangeRateList
            exchangeRate={exchangeRatesList}
            loading={loadingExchangeRatesList}
            error={errorExchangeRatesList}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
