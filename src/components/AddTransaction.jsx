import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';


export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext);

    const handleSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            id: new Date(),
            text,
            amount: +amount
        }
        addTransaction(newTransaction);
        setText('')
        setAmount('')
    }
    return (
        <>
          <h3>Add new transaction</h3>  
          <form onSubmit={handleSubmit}>
              <div className="form-control">
                  <label htmlFor="text">Text</label>
                  <input type="text" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)}/>
              </div>
              <div className="form-control">
                  <label htmlFor="amount">Amount <br/></label>
                  <input type="number" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)}/>
              </div>
              <button className="btn">Add Transaction</button>
          </form>
        </>
    )
}
