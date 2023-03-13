import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 't-Shirt',
        amount: 20.99,
        date: new Date('2022-12-15')
    },
    {
        id: 'e2',
        title: 'trouser',
        amount: 30.09,
        date: new Date('2022-02-09')
    },
    {
        id: 'e3',
        title: 'cult-fit subscription',
        amount: 90.2,
        date: new Date('2023-01-01')
    },
    {
        id: 'e4',
        title: 'swiggy food',
        amount: 10,
        date: new Date('2023-03-05')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ title, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { title, amount, date }) => {}
});

const expensesReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
                );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload );
        default: 
            return state;    
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE', payload: id });
    };

    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;
