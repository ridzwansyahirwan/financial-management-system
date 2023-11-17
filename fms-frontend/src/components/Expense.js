import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../style/dashboard.css';
import backgroundImage from './latar.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function Expense() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        minWidth: '100%',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
    }

    const style = {
        display: 'flex',
        justifyContent: 'center',
    }

    useEffect(() => {
        fetch('http://localhost/fms-backend/expenses.php')
            .then(response => response.json())
            .then(data => {
                setExpenses(data);
            })
            .catch(error => {
                console.error('Error fetching expenses:', error);
            });
    }, []);

    const handleDelete = (expenseId) => {
        fetch(`http://localhost/fms-backend/delete.php?id=${expenseId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Deletion response:', data);
                // Optionally update the state or re-fetch the expenses
            })
            .catch(error => {
                console.error('Error deleting expense:', error);
            });
    };
    
    const handleAddClick = () => {
        navigate('/AddExpense');
      };

    return (
        <div className="header" style={backgroundStyles}>
            <Navbar />
            <div className="container" style={style} >
                <div className="section">
                    <h2>Expense List</h2>
                    <button className="btn btn-primary mb-3"  onClick={handleAddClick}>Add</button>
                    <div className="table-container" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Amount (RM)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(expenses) && expenses.length > 0 ? (
                                expenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.name.toUpperCase()}</td>
                                        <td>{expense.category.toUpperCase()}</td>
                                        <td>{expense.amount}</td>
                                        <td>
                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No expenses found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expense;
