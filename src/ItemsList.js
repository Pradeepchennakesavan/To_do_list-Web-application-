import React from 'react'
import LineItem from './LineItem';

const ItemsList = ({items, setItems, handleDelete, handlecheck}) => {
  return (
    <ul>
            {items.map((item) => (
                <LineItem 
                    item = {item}
                    key = {item.id}
                    setItems = {setItems}
                    handleDelete = {handleDelete}
                    handlecheck = {handlecheck}
                />
            ))}
        </ul>
  )
}

export default ItemsList
