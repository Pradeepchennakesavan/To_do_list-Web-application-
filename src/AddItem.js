import React, { useRef } from 'react'
import { IoIosAdd } from "react-icons/io";


const AddItem = ({newItem, setNewItem, handleSubmit}) => {

  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="Addform">Add Item</label>
        <input 
            type="text"
            ref={inputRef}
            placeholder='Add Item'
            required
            id="Additem"
            autoFocus 
            value = {newItem}
            onChange={(e) => setNewItem(e.target.value)}
        />
        <button 
            type='submit'
            aria-label='Add Item'
            onClick={() => inputRef.current.focus()}
        > 
         <IoIosAdd />
        
        </button>
    </form>
  )
}

export default AddItem
