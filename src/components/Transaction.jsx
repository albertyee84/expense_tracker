import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';


export const Transaction = ({ transaction }) => {
    const classSign = transaction.amount >= 0 ? "plus" : "minus";
    const trxSign = transaction.amount >= 0 ? "+" : "-";
    const { deleteTransaction } = useContext(GlobalContext);

    return (
        <li className={classSign}>
            {transaction.text} <span>{trxSign}${Math.abs(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>X</button>
        </li>
    )
}