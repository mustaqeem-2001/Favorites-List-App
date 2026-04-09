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

  function getBtnStyles(name) {
    return {
      backgroundColor: isActive === name ? "#7f22fe" : "#fff",
      color: isActive === name ? "#fff" : "#868686"
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
        <button type="submit">+ Add </button>
      </form>
      <div className="button-group">
        <button className={`toggle-btn ${isActive === "total" ? "active" : ""}`} ref={totalBtnRef} 
                onClick={() => setIsActive("total")} 
                style={getBtnStyles("total")}>
          <span className="count">{itemList.length}</span> 
          <span className="label">Total</span>
        </button>
        <button className={`toggle-btn ${isActive === "fav" ? "active" : ""}`} style={getBtnStyles("fav")} onClick={() => setIsActive("fav")}>
          <span className="count">
            {itemList.filter(function(item) {
              return item.isStarred;
            }).length} 
          </span>
          <span className="label">Favourites</span>
        </button>
      </div>
        { isActive === "fav" ?
          (
            <>
              <p className="fc-p">STARRED</p>
              <ul>
                {
                  starredItems.map(item => 
                   <li key={item.id} className="item-starred">
                    <div className="flex-gap">
                      <button className="star-icon star-icon-active" type="button" onClick={() => handleClick(item.id)}>
                        <i className="fa-solid fa-star"></i>
                      </button>
                      <span  className="item-starred-name">{item.name}</span>
                    </div>
                    
                    <div className="flex-gap">
                        {item.isStarred && <span className="item-fav">FAV</span>}
                      <button type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  </li>
                  )
                }
              </ul>
              <p className="fc-p">ALL ITEMS</p>
              <ul>
                {
                  noStarredItems.map(item => 
                    <li key={item.id} className={`${item.isStarred ? "item-starred" : ""}`}>
                    <div className="flex-gap">
                      <button className="star-icon" type="button" onClick={() => handleClick(item.id)}>
                        <i className="fa-regular fa-star"></i>
                      </button>
                      <span  className={`${item.isStarred ? "item-starred-name" : ""}`}>{item.name}</span>
                    </div>
                    
                    <div className="flex-gap">
                        {item.isStarred && <span className="item-fav">FAV</span>}
                      <button type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  </li>
                  )
                }
              </ul>
            </>
          ) : 
          (
            <>
              <p className="fc-p">ALL ITEMS</p>
              <ul>
                {itemList.map(item => 
                  <li key={item.id} className={`${item.isStarred ? "item-starred" : ""}`}>
                    <div className="flex-gap">
                      <button className={`star-icon ${item.isStarred ? "star-icon-active" : ""}`} type="button" onClick={() => handleClick(item.id)}>
                        {item.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                      </button>
                      <span  className={`${item.isStarred ? "item-starred-name" : ""}`}>{item.name}</span>
                    </div>
                    
                    <div className="flex-gap">
                        {item.isStarred && <span className="item-fav">FAV</span>}
                      <button className="bin-icon" type="button" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                  </li>
                )}
              </ul>
            </>
          )
        }
      </main>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Mustaqeem Chowdhury. 
        </p>
        <span className="footer-span">All rights reserved.</span>
      </footer>
    </>
  )
}