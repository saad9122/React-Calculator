import {ACTIONS} from "./app.jsx"

export default function OperationButton({dispatch,operation}){
  
  return (
    <button className="operations" onClick={()=>dispatch({type:ACTIONS.ADD_OPPERATION, payload:{operation}})}>
  
  {operation}
  </button>
  )

}