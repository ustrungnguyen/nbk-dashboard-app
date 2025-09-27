// Importing Libraries
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';

// Importing Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Form from './pages/Form/Form';

// Importing CSS
import './App.css';

export default function App() {

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/form' element={<Form />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}