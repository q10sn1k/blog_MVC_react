import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div>
      {/* здесь можно добавить другие компоненты */}
      <Navbar />
      <Register />
      <Login />
    </div>
  );
}

export default App;

