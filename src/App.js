import Transaction from './components/Transaction';
import "./App.css";
import React, { Component } from 'react';
import FormComponent from './components/FormComponent';
import {useState,useEffect} from "react";
import DataContext from './data/DataContext';
import ReportComponent from"./components/ReportComponent";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  const design = {color:'red',textAlign:'center',fontSize:'1.5rem'}

  const initData = [
    {id:1,title:"Rent",amount:-3000},
    {id:2,title:"Salary",amount:50000}
  ]
   const [items,setItems] = useState([initData])
   const [reportIncome,setReportIncome] = useState(0)
   const [reportExpense,setReportExpense] = useState(0)

   const onAddNewItem = (newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
   }
   useEffect(()=>{
      const amounts = items.map(items=>items.amount)
      const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
      const expense =( amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
setReportIncome(income.toFixed(2))
setReportExpense(expense.toFixed(2))


   },[items,reportIncome,reportExpense])

  return(
  
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>

        <div className="container">
 
    <h1 style={design}>Income-Expense program</h1>
    <Router>
    <div>
      <ul className="horizontal-menu">
        <li>
         <Link to ="/">Description</Link>
        </li>
        <li>
          <Link to ="/insert">Save</Link>
          

        </li>
      </ul>
      <Switch>
        <Route path="/"exact>
          <ReportComponent/>
          
        </Route>
        <Route path="/insert">

        <FormComponent onAddItem={onAddNewItem}/>
         <Transaction items = {items}/>
        </Route>

      </Switch>
    </div>
    </Router>
 
    
        </div>
     </DataContext.Provider>



  ) ;
    

}

export default App;
