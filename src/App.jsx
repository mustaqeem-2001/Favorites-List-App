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
        {itemList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}