// will create our global context
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


//Initial State
const initialState = {
    transactions: [],
    errors: null,
    loading: true
}

//Create context
export const GlobalContext = createContext(initialState);

//In order for our components to have access to our global state, we need to wrap everything in a Provider Component

//Provider Component
export const GlobalProvider = ({ children }) => {
    //destructured children is what we wrap our GlobalProvider with in App.js
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data
            })        
        } catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: error.response.data.error
            });    
        }
    }

    async function deleteTransaction(id){
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
              type: "DELETE_TRANSACTION",
              payload: id
            });
        } catch (error) {
            dispatch({
            type: "TRANSACTION_ERROR",
            payload: error.response.data.error
            });   
        }
    }
    async function addTransaction(transaction){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/v1/transactions`, transaction, config);
            dispatch({
                type: "ADD_TRANSACTION",
                payload: res.data.data
            });

        } catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: error.response.data.error
            });   
        }


    }


    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        getTransactions,
        addTransaction}}
    >
        {children}
    </GlobalContext.Provider>)
}