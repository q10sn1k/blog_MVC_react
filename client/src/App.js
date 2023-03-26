import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Register from "./components/Register";
import Login from "./components/Login";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Post from "./components/Post";

function App() {
  return (
    <div>
      <Navbar />
      <Register />
      <Login />
      <PostList />
      <PostForm />
      <Post />
    </div>
  );
}

export default App;

