import { nanoid } from "nanoid";
import initialItemList from "./data/initialItemList.js";
import { useState } from "react";
export default function App() {  
  const [itemList, setItemlist] = useState(initialItemList);

  function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
    const inputValue = formData.get("inputItem");
    setItemlist(function(prevItems) {
      return [...prevItems, {id: nanoid(), name: inputValue, isStarred: false}]
    });
    e.target.reset();
  }

  function handleClick(itemId) {
    setItemlist(function(prevItems) {
       return prevItems.map(function(item) {
        return item.id === itemId ? {...item, isStarred: !item.isStarred} : item;
      })
    })
  }

  function handleDelete(itemId) {
    setItemlist(function(prevItems) {
      return prevItems.filter(function(item) {
        return item.id !== itemId;
      })
    })
  }
  return (
    <div>
      <h1>My Favourites</h1>
      <p>Add items and mark your favorites</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputItem" className="sr-only">
          Add Item: 
        </label>
        <input type="text" name="inputItem" id="inputItem" placeholder="Type an item (e.g. Inception)..."/>
        <button type="submit">+ Add</button>
      </form>
      <div>
        <div>{itemList.length} Total</div>
        <div>
          {itemList.filter(function(item) {
            return item.isStarred;
          }).length} Favourites
        </div>
      </div>
      <ul>
        {itemList.map(item => 
          
          <li key={item.id}>
            <button type="button" onClick={() => handleClick(item.id)}>
                {item.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
            </button>
            <span>{item.name}</span>
            {item.isStarred && <span>FAV</span>}
            <button type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
          </li>
      )}
      </ul>
    </div>
  )
}