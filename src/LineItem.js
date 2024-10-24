import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item,  handleDelete, handlecheck}) => {
  return (
    <li className="item" >
                    <input 
                        type="checkbox"
                        checked ={item.checked}
                        onChange={() => handlecheck(item.id)}
                    />
                    <label 
                        onDoubleClick={() => handlecheck(item.id)}
                    >{item.item}</label>
                    <FaTrashAlt
                        onClick={() => handleDelete(item.id)}
                    />
    </li>
  )
}

export default LineItem
