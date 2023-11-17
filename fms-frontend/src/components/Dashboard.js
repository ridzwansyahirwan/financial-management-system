import React from 'react';
import Navbar from './Navbar';
import '../style/dashboard.css';
import backgroundImage from './latar.jpg';

function Dashboard() {
    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="header" style={backgroundStyles}>
            <Navbar />
            <div className="section">
                <h1>Financial Management System</h1>
                <p>By Ridzwansyah Irwan</p>
            </div>
        </div>
    );
}

export default Dashboard;
