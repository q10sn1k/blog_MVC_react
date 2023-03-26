import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Register from "./components/Register";
import Login from "./components/Login";
import PostList from "./components/PostList";

function App() {
  return (
    <div>
      {/* здесь можно добавить другие компоненты */}
      <Navbar />
      <Register />
      <Login />
      <PostList />
    </div>
  );
}

export default App;

