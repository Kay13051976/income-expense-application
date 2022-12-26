import {useState,useEffect} from 'react';
import React, { Component } from 'react';
import './FormComponent.css';
import { v4 as uuidv4 } from 'uuid';




const FormComponent = (props)=>{
console.log("Render From Component")
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    const [formValid,setFormValid] = useState(false)

    const inputTitle = (event)=>{

        setTitle(event.target.value)
    }
    const inputAmount = (event)=>{
        setAmount(event.target.value)
    }
    const saveItem = (event)=>{
        event.preventDefault()
        const itemData = {
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(itemData)
        setTitle('')
        setAmount('')

    }
    useEffect(()=>{
        const checkData = title.trim().length>0 && amount!==0
        setFormValid(checkData)
        
    },[title,amount])
    
       return(
        <div>
            <form onSubmit = {saveItem}>
               <div className="form-control">
                <label>Dairy List</label>
                <input type="text" placeholder="description "  onChange={inputTitle} value={title}/>
                </div>
                <div className="form-control">
                  <label>Price List</label>
                  <input type="number" placeholder="(+income, -expense) " onChange={inputAmount} value={amount}/>
                 </div>
                 <div>
                    <button type="submit" className="btn" disabled={!formValid}>Edit Information</button>
                 </div>
             </form>

        </div>

    )
}

export default FormComponent