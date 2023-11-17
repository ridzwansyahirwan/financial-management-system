import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetSummary() {
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        fetchExpenseData();
    }, []);

    const fetchExpenseData = async () => {
        try {
            const response = await axios.get('http://localhost/fms-backend/budgetSummary.php');
            setExpenseData(response.data);
        } catch (error) {
            console.error('Error fetching expense data:', error);
        }
    };

    const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1] || '';
    };

    return (
        <div className="container">
            <h2 style={{ color: 'white' }}>Budget Summary for 2023</h2>
            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table className="table table-bordered table-hover" >
                <thead className="table-dark">
                    <tr>
                        <th>Month</th>
                        <th>Category</th>
                        <th>Total Amount (RM)</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseData.map((expense, index) => (
                        <tr key={index}>
                            <td>{getMonthName(parseInt(expense.month))}</td>
                            <td>{expense.category}</td>
                            <td>{expense.total_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default BudgetSummary;
