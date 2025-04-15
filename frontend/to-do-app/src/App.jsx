import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoItem from './TodoItem';
import Pomo from './Pomo';
import About from './About';
import WhyPomodoro from './WhyPomodoro';

// API pagrindinis URL
const API_Base = 'http://localhost:3000/todo'

// Pagrindinis komponentas su užduočių sąrašu
function Main() {
  const [items, setItem] = useState([])
  const [input, setInput] = useState("")

  // Gauti užduotis iš serverio
  useEffect(() => {
    getTodos()
  }, [])

  // Apdoroti įvesties lauko pakeitimus
  function HandleInput(event){
    setInput(event.target.value)
  }

  // Pridėti naują užduotį
  const addItem = async() => {
    if (!input.trim()){
      alert("Please enter a task!")
      return
    }
    const data = await fetch(API_Base + "/new", {
      method: "POST",
      headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: input,
    })
  }).then(res => res.json())
    await getTodos()
    setInput('')
  }

  // Ištrinti užduotį
  const deleteTodo = async(id) => {
    try{
        const response = await fetch (API_Base + '/delete/' + id, {
            method: 'DELETE'
        })
        if(!response.ok){
            throw new Error("Failed to delete task")
        }
        const data = await response.json()
        setItem(items => items.filter(item=> item._id !== data._id))
    }catch(error){
        console.error("Error updating task status", error)
    }
  }

  // Gauti visas užduotis
  const getTodos = () => {
    fetch(API_Base)
    .then(res => res.json())
    .then(data => { console.log(data); setItem(data)})
    .catch(err => console.log(err))
  }

  return (
    <div className="app-container">
      <Pomo />
      <div className="todo-container">
        <h1 className="app-title">TO DO LIST</h1>
        <div className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={input}
            onChange={HandleInput}
          />
          <button onClick={addItem} className="add-button">
            <span className="button-text">Add</span>
          </button>
        </div>
        <div className="todo-list">
          {items.map((item) => {
            const {_id, name} = item
            return <TodoItem name={name} id={_id} deleteTodo={deleteTodo} refreshTodos={getTodos}/>
          })}
        </div>
      </div>
    </div>
  );
}

// Pagrindinis aplikacijos komponentas su navigacija
function App() {
  return (
    <Router>
      <div>
        <header className="app-header">
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/why-pomodoro" className="nav-link">Why Pomodoro Works</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-pomodoro" element={<WhyPomodoro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
