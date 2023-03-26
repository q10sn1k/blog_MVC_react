import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Post from './components/Post';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
