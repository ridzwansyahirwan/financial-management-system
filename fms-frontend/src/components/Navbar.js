import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './logo.png';

function Navbar() {
    return (
        <div className="navbar">
            <img src={logoImage} className="logo" alt="Logo" />
            <ul>
                <li><Link to="/Dashboard">Home</Link></li>
                <li><Link to="/Expense">Expense Tracking</Link></li>
                <li><Link to="/Budgeting">Budget Tracking</Link></li>
                <li><Link to="/Report">Financial Report</Link></li>
                <li><Link to="/">Log Out</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;
