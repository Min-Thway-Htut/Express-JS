import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/posts`
})

function App () {

  const [title, setTitle] = useState([]);

  useEffect(() => {
    api.get('/').then(res => {
      console.log(res.data);
      setTitle(res.data)
    }).catch(err => {
      console.error('Error fetching data:', err);
    });
  }, []);

  const createPost = async () => {
    try {
      const res = await api.post('/', {
        title: 'New Post Title',
        body: 'This is the body of the new post',
        userId: 1
      });
      console.log(res.data);
      setTitle(prevTitle => [...prevTitle, res.data]);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const updatePost = async (id) => {
    try {
      const res = await api.put(`/${id}`, {
        title: 'Updated Title',
        body: 'Updated body of the post',
        userId: 1
      });
      console.log(res.data);
      setTitle(prevTitle => prevTitle.map(post => post.id === id ? res.data : post)); 
    }catch(err){
      console.error('Error updating post:', err);
    };
  };

  const patchPost = async (id) => {
    try {
      const res = await api.patch(`/${id}`, {
        title: 'Patched Title'
      });
      console.log(res.data);
      setTitle(prevTitle => prevTitle.map(post => post.id === id ? res.data : post));
    } catch (err) {
      console.error('Error patching post:', err);
    }
  }

  return (
    <div className="App">
      <button onClick={createPost}>Create Post</button>
      <button onClick={() => updatePost(1)}>Update Post 1</button>
      <button onClick={() => patchPost(1)}>Patch Post</button>
      <header className="App-header">
        {title.map(titles => <h2 key={titles.id}>{titles.title}</h2>)}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
