import { nanoid } from "nanoid";
import initialItemList from "./data/initialItemList.js";
import { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {  
  const [itemList, setItemlist] = useState(initialItemList);
  const totalBtnRef = useRef(null);
  const [isActive, setIsActive] = useState("");
  const starredItems = itemList.filter(item => item.isStarred)
  const noStarredItems = itemList.filter(item => !item.isStarred);

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

  function getBtnStyles(name, colour) {
    return {
      backgroundColor: isActive === name ? colour : "gray"
    }
  }

  useEffect(() => totalBtnRef.current.click(), []);

  return (
    <>
    <header className="header">
      <div className="header-heart">
        <i className="fa-solid fa-heart"></i>
      </div>
      <h1>My Favourites</h1>
      <p className="header-p">Add items and mark your favorites</p>
    </header>
    <main className="main">
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputItem" className="sr-only">
          Add Item: 
        </label>
        <input type="text" name="inputItem" id="inputItem" placeholder="Type an item (e.g. Inception)..."/>
        <button type="submit">+ Add</button>
      </form>
      <div>
        <button ref={totalBtnRef} onClick={() => setIsActive("total")} style={getBtnStyles("total", "green")}>{itemList.length} Total</button>
        <button style={getBtnStyles("fav", "blue")} onClick={() => setIsActive("fav")}>
          {itemList.filter(function(item) {
            return item.isStarred;
          }).length} Favourites
        </button>
      </div>
        { isActive === "fav" ?
          (
            <>
              <ul>
                {
                  starredItems.map(item => 
                    <li key={item.id}>
                      <button type="button" onClick={() => handleClick(item.id)}>
                          {item.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                      </button>
                      <span>{item.name}</span>
                      {item.isStarred && <span>FAV</span>}
                      <button type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>
                  )
                }
              </ul>
              <p>ALL ITEMS</p>
              <ul>
                {
                  noStarredItems.map(item => 
                    <li key={item.id}>
                      <button type="button" onClick={() => handleClick(item.id)}>
                          {item.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                      </button>
                      <span>{item.name}</span>
                      {item.isStarred && <span>FAV</span>}
                      <button type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>
                  )
                }
              </ul>
            </>
          ) : 
          (
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
          )
        }
      </main>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} YourName. All rights reserved.
        </p>
      </footer>
    </>
  )
}