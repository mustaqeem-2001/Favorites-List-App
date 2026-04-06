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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputItem">
          Add Item: 
          <input type="text" name="inputItem" id="inputItem"/>
        </label>
        <button type="submit">+ Add</button>
      </form>
      <h1>My Favourites List</h1>
      <ul>
        {itemList.map(item => 
          
          <li key={item.id}>
            <button type="button" onClick={() => handleClick(item.id)}>
                {item.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
            </button>
            {item.name}
          </li>
      )}
      </ul>
    </div>
  )
}