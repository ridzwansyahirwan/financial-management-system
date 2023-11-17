import React, { useState } from 'react';
import Navbar from './Navbar';
import BudgetSummary from './BudgetSummary';
import backgroundImage from './latar.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Budgeting() {
    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        minWidth: '100%',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
    };

    const [values, setValues] = useState({ date: '', category: '', amount: '' });
    const [backendError, setBackendError] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];
    
    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setValues((prev) => ({ ...prev, date: selectedMonth }));
        setSelectedMonth(selectedMonth);
    };

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting form with data:', values);

        if (Object.values(values).every((val) => val !== '')) {
            axios.post('http://localhost/fms-backend/addBudget.php', {
                date: values.date || '',
                category: values.category || '',
                amount: values.amount || '',
            })
            .then((res) => {
                console.log('Insert data successful:', res.data);
                alert('Insert Successfull');
                window.location.reload();
            })
            .catch((err) => {
                console.log('Backend error:', err.response.data);
                setBackendError([err.response.data.message]);
            });
        }
    };

    return (
        <div className="container-fluid" style={backgroundStyles}>
            <Navbar />
            <div className="container">
                <h2 style={{ color: 'white' }}>Budget</h2>
                {backendError.length > 0 &&
                backendError.map((e, index) => (
                    <p key={index} className='text-danger'>
                        {e}
                    </p>
                ))}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className='mb-3'>
                        <label htmlFor='month' className='form-label' style={{ color: 'white' }}><strong>Month</strong></label>
                        <select className='form-select' value={selectedMonth} onChange={handleMonthChange} name='month' required>
                            <option value=''>Select Month</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                    <label className='form-label' style={{ color: 'white' }} required><strong>Category</strong></label>
                    <div style={{ color: 'white' }}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="Housing" onChange={handleInput} />
                            <label className="form-check-label" htmlFor="Housing">
                                Housing
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="Utilities" onChange={handleInput} />
                            <label className="form-check-label" htmlFor="Utilities">
                                Utilities
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="Transportation" onChange={handleInput} />
                            <label className="form-check-label" htmlFor="Transportation">
                                Transportation
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="Food" onChange={handleInput} />
                            <label className="form-check-label" htmlFor="Food">
                                Food
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="category" value="Healthcare" onChange={handleInput} />
                            <label className="form-check-label" htmlFor="Healthcare">
                                Healthcare
                            </label>
                        </div>
                    </div>
                </div>
                    <div className='mb-3'>
                        <label htmlFor='amount' className='form-label' style={{ color: 'white' }}><strong>Amount</strong></label>
                        <input type='text' className='form-control' placeholder='Enter Amount' name='amount' onChange={handleInput} disabled={!values.date} required/>
                    </div>
                    <button type='submit' className='btn btn-success' disabled={!values.date}>Add Budget</button>
                </form>
            </div>
            <div className='container mt-4 mb-4'>
                <BudgetSummary />
                <br></br>
            </div>
        </div>
    );
}

export default Budgeting;
