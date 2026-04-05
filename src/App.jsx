import itemList from "./components/ItemList.js";
export default function App() {  
  return (
    <div>
      <h1>My Favourites List</h1>
      <ul>
        {itemList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}