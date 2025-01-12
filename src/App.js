import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
});

function App () {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    api.get('/')
    .then((res) => {
      setTodos(res.data);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    })
  },[]);

  const addTodo = async () => {
    const newTask = {
      title: newTodo,
      completed: false,
    };

    try {
      const res = await api.post('/', newTask);
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  const toggleComplete = async (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo.completed = !updatedTodo.completed;

    try {
      await api.put(`/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (

    <div className="App">
      <h1>To-Do List</h1>
      <input 
      type='text'
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder='Add a new task'
      />
      <button onClick={addTodo}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => toggleComplete(todo.id)}>
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
