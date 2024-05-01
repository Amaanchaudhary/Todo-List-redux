import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addTodo, toggleCompleted, deleteTodo , updateTodo } from './Slices/slice';
import { useState } from 'react';

function App() {

  const [newTodo, setNewTodo] = useState('')
  const [updateID , setUpdateId] = useState('')
  const [updateItem , setUpdateItem] = useState('')
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const todoss = useSelector(state => state.todos.allTodos)  //here state refers to the whole redux store and todos 
  console.log(updateItem);                              //is the property of store's object and allTodos is our initialState Name

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo({ id: Math.random(), text: newTodo, completed: false }))
    setNewTodo('')
  }

  const handleChange = (event) => {
    setNewTodo(event.target.value)
  }

  function handletoggle(id) {
    dispatch(toggleCompleted(id))
  }

  function handleDelete(id) {
    dispatch(deleteTodo(id))
  }

  function handlePopup(id) {
    const val = todoss.find(todo => todo.id === id)
    setUpdateItem(val.text)
    setPopup(true)
    setUpdateId(id)
  }

  function handleUpdate(event) {
    setUpdateItem(event.target.value)
  }

  function handleUpdateSubmit(event) {
    event.preventDefault();
    dispatch(updateTodo({updateID , updateItem}))
    setPopup(false)
  }

  return (
    <div className="App">
      <form className='button-input-container' onSubmit={handleAddTodo}>
        <input type='text' placeholder='Add Todo Here' value={newTodo} onChange={handleChange} required />
        <button className='add-btn' type='submit'>Add Todo</button>
      </form>
      <ul>
        {
          todoss.map((val, index) => (
            <li key={index}>
              <label className={val.completed ? 'completed' : ''}>
                <p>{val.text}</p>
                <input type="checkbox" checked={val.completed} onChange={() => handletoggle(val.id)} />
              </label>
              {val.completed ?
                <button className='delete-btn' onClick={() => handleDelete(val.id)}>DELETE</button> :
                <button className='update-btn' onClick={() => handlePopup(val.id)}>UPDATE</button>
              }
            </li>
          ))
        }
      </ul>
      {popup && 
        <form onSubmit={handleUpdateSubmit} className="popup" id="popup">
          <div className="popup-content">
            <input type="text" id="updateInput" value={updateItem} onChange={handleUpdate} placeholder="Enter updated todo"/>
              <button type='submit' id="updateSubmit" >Submit</button>
          </div>
        </form>
      }
    </div>
  );
}

export default App;
