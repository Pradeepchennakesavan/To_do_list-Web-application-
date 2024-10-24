import React from "react";
import ItemsList from "./ItemsList";


const Content = ({items, setItems, handleDelete, handlecheck}) => {
    
  return ( 
      <>
        {(items.length) ? (
            <ItemsList 
                items = {items}
                setItems = {setItems}
                handleDelete = {handleDelete}
                handlecheck = {handlecheck}
            />
        ) : (
            <p>Your list is empty</p>
        )}
        
      </>
  )
}

export default Content
