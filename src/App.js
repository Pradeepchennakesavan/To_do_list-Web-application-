import React from 'react'
import Header from './Header';
import Content from './Content'
import Footer from './Footer'
import { useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import { useEffect } from 'react';
import apiRequest from './apiRequest';


const App = () => {
  
const [items, setItems] = useState([]);
const API_URL = "http://localhost:3500/items"
const [fetchErr, setFecthErr] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const fecthItems = async () =>{
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data not received')
        const listItems = await response.json()
        setItems(listItems)
        setFecthErr(null)
      } catch (err) {
        setFecthErr(err.message)
      }finally{
        setIsLoading(false)
      }
    }
   

    setTimeout(() => {
      (async () => await fecthItems())()
    },2000)
}, []);

//Add item
const addItem = async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const myNewItem = {id, checked:false, item}
  const listItems = [...items, myNewItem]
  setItems(listItems);

  const postOptions = {
    method: "POST",
    headers:{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(myNewItem)
  }
    const result = await apiRequest(API_URL,postOptions)
    if(result) setFecthErr(result)
}

const [newItem, setNewItem] = useState('')
const [search, setSearch] = useState('');

const handleSubmit = (e) => {
  e.preventDefault()
  if (!newItem) return;
  addItem(newItem)
  setNewItem('')
}

const handlecheck = async (id) =>{
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFecthErr(result);
    
}
    
const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {method: 'DELETE'}

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFecthErr(result);
    
}
  return (
    <div className='App'>
      <Header />
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <main>
        {isLoading && <p>Loading Items </p>}
        {fetchErr && <p>{`Error: ${fetchErr}`} </p>}
        {!isLoading && !fetchErr && <Content
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          setItems = {setItems}
          handleDelete = {handleDelete}
          handlecheck = {handlecheck}
        />}
      </main>
      <Footer 
        length = {items.length}
      />
      <SearchItem 
        search ={search}
        setSearch = {setSearch}
      />
    </div>
  )
}

export default App
