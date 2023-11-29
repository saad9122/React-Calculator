import React, { useState, useEffect,useReducer} from "react";
import { Router, Link } from "wouter";

// Import and apply CSS stylesheet
import "./styles/styles.css";
import DigitButton from "./DigitButton.jsx"
import OperationButton from "./OperationButton.jsx"
// Where all of our pages come from
//import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
//import Seo from './components/seo.jsx';


//9895eaa1

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  ADD_OPPERATION: "add-operation",
  CLEAR:"Clear",
  CALCULATE:"calculate",
  DELETE:"delete"
  
}

function evaluate(state){
  const prev = parseFloat(state.prevOp)
  const curr = parseFloat(state.currOp)
  
   if(isNaN(prev)|| isNaN(curr)) return ""
  
  switch(state.operation){
        
   case "/":
      return prev/curr
  
  case "*":
      return prev*curr
  
  case "+":
      return prev+curr
  
  case "-":
      return prev-curr
  }
}

function reducer(state,{type,payload}){
  // console.log(state.currOp,payload.digit)  
  switch(type){    
    case ACTIONS.ADD_DIGIT: 
      
      if(state.overwrite){
        return {
          ...state,
          currOp:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit === "0" && state.currOp === "0") return state; 
      if(state.currOp === "0" && payload.digit !== "0") {

        console.log("its yes")
        return {
          ...state,
          currOp: payload.digit

        }
      }
      if(payload.digit === "." && state.currOp == null){
       return {
         ...state,
         currOp:"0"+`${payload.digit}`
         
       }  
      } 
      if(payload.digit === "." && state.currOp.includes(".")) return state;
      return {
        ...state,
        currOp:`${state.currOp || ""}${payload.digit}`,
      }
    case ACTIONS.ADD_OPPERATION:
     
      if(state.currOp == null && state.prevOp == null) return state
      if(state.prevOp == null){
          return {
        ...state,
        operation:payload.operation,
        prevOp:`${state.currOp}`,
        currOp:null
      }} 
      if(state.currOp == null){
        return {
          ...state,
          operation:payload.operation
        }
      }
      return {
      ...state,
        prevOp: `${evaluate(state)}`,
        currOp:null,
        operation:payload.operation
        
      }
    case ACTIONS.CALCULATE:
      if(state.prevOp==null || state.currOp== null) return state
      return {
        ...state,
        currOp: `${evaluate(state)}`,
        prevOp:null,
        operation:null,
        overwrite:true
        
      }
      
    case ACTIONS.CLEAR:
    return {
      currOp:null
    }
      
    case ACTIONS.DELETE:
   
    if(state.overwrite) return {
      ...state,
      currOp:null,
      overwrite:false
    
    }
    
    if(state.currOp == null) return state
      
    if(state.currOp,length === 1) return {...state,currOp:null}
      
    return {
      ...state,
      currOp:state.currOp.slice(0,-1)
        
    }
      
  }
}

export default function App() {
  
  const [{currOp,prevOp,operation},dispatch] = useReducer(reducer,{})
  
  return (
  <div className="calculator">
    <div className="screen">  
      <div className="prev">{prevOp}{operation}</div>
      <div className="curr">{currOp}</div>
    </div>  
    <button className="span-two" onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
      
    <button onClick={()=> dispatch({type:ACTIONS.DELETE})}>DEL</button>
    <OperationButton operation = "/" dispatch = {dispatch}/>

    <DigitButton digit="7" dispatch = {dispatch}/>
    <DigitButton digit="8" dispatch = {dispatch}/>
    <DigitButton digit="9" dispatch = {dispatch}/>
    <OperationButton operation = "*" dispatch = {dispatch}/>
    <DigitButton digit="4" dispatch = {dispatch}/>
    <DigitButton digit="5" dispatch = {dispatch}/>
    <DigitButton digit="6" dispatch = {dispatch}/>
    <OperationButton operation = "+" dispatch = {dispatch}/>
    <DigitButton digit="1" dispatch = {dispatch}/>
    <DigitButton digit="2" dispatch = {dispatch}/>
    <DigitButton digit="3" dispatch = {dispatch}/>
    <OperationButton operation = "-" dispatch = {dispatch}/>
    <DigitButton digit="." dispatch = {dispatch}/>
    <DigitButton digit="0" dispatch = {dispatch}/>
   <button className="span-two evalu" onClick={()=> dispatch({type:ACTIONS.CALCULATE})}>=</button>
  </div>
    
  );
}
