import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Register from "./components/Register";

function App() {
  return (
    <div>
      {/* здесь можно добавить другие компоненты */}
      <Navbar />
      <Register />
    </div>
  );
}

export default App;

