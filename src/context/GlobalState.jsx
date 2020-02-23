// will create our global context
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';


//Initial State
const initialState = {
    transactions: []
}

//Create context
export const GlobalContext = createContext(initialState);

//In order for our components to have access to our global state, we need to wrap everything in a Provider Component

//Provider Component
export const GlobalProvider = ({ children }) => {
    //destructured children is what we wrap our GlobalProvider with in App.js
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function deleteTransaction(id){
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        });
    }
    function addTransaction(transaction){
        dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        });
    }


    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction}}
    >
        {children}
    </GlobalContext.Provider>)
}