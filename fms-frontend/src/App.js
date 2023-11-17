import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Landing from './components/LandingPage';
import Budgeting from './components/Budgeting';
import Expense from './components/Expense';
import Report from './components/Report';
import AddExpense from './components/AddExpense.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Budgeting" element={<Budgeting />} />
        <Route path="/Expense" element={<Expense />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/AddExpense" element={<AddExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
