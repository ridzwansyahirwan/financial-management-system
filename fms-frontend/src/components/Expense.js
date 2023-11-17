import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import backgroundImage from './latar.jpg';
import '../style/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    const [expenseId, setExpenseId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const categories = ['Housing', 'Utilities', 'Transportation', 'Food', 'Healthcare'];
    const [showModal, setShowModal] = useState(false);

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
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Deletion response:', data);
            if (data && data.message === "Expense deleted successfully") {
                alert('Expense deleted successfully!');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
        });
    }; 
    
    const confirmDelete = (expenseId) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            handleDelete(expenseId);
        } else {
           //
        }
    };

    const handleAddClick = () => {
        navigate('/AddExpense');
      };

      const handleEdit = (id, date, name, category, amount) => {
        console.log(id, date, name, category, amount);
        setExpenseId(id);
        setUpdatedDate(date);
        setUpdatedName(name);
        setUpdatedCategory(category);
        setUpdatedAmount(amount);
        setShowModal(true);
    };

    const handleUpdate = () => {
        console.log(updatedName);
        fetch(`http://localhost/fms-backend/edit.php?id=${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "id": expenseId,
                    "date": updatedDate,
                    "name": updatedName,
                    "category": updatedCategory,
                    "amount": updatedAmount
                                       

                }
            ),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
            console.log('Edit response:', data);
            alert('Expense edited successfully!');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error editing expense:', error);
            if (error && error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', error.response.data);
            }
        });
    
        setShowModal(false);
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
                                        <button onClick={() => handleEdit(expense.id, expense.date, expense.name, expense.category, expense.amount)} className="btn btn-primary" style={{ padding: '10px', borderRadius: '90%', width: '50px', height: '50px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                            </svg>
                                        </button> &nbsp;
                                        <button onClick={() => confirmDelete(expense.id)} className="btn btn-danger" style={{ padding: '10px', borderRadius: '90%', width: '50px', height: '50px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
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
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="expenseDate" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="expenseDate" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expenseName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="expenseName" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expenseCategory" className="form-label">Category</label>
                                    <select className="form-select" id="expenseCategory" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expenseAmount" className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="expenseAmount" value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button variant="primary" onClick={handleUpdate}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expense;
