import { StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([])

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetching(true);
      const expenses = await getExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }

    fetchExpenses();

  }, []);

  if(isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput 
    expenses={recentExpenses} 
    expensesPeriod="Last 7 Days" 
    fallbackText="No expenses registered in the last 7 days" />
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})