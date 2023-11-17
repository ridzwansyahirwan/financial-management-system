import React, { useState } from 'react';
import Navbar from './Navbar';
import backgroundImage from './latar.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function AddExpense() {
    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const [values, setValues] = useState({ date: '', name: '', category: '', amount: '' });
    const [backendError, setBackendError] = useState([]);

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting form with data:', values);

        if (Object.values(values).every((val) => val !== '')) {
            axios.post('http://localhost/fms-backend/add.php', {
                date: values.date || '',
                name: values.name || '',
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
            <h2 style={{ color: 'white' }}>Add Expense</h2>
            {backendError.length > 0 &&
                backendError.map((e, index) => (
                    <p key={index} className='text-danger'>
                        {e}
                    </p>
                ))}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className='mb-3'>
                    <label htmlFor='date' className='form-label' style={{ color: 'white' }}><strong>Date</strong></label>
                    <input type='date' className='form-control' placeholder='Enter date' name='date' onChange={handleInput} required/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label' style={{ color: 'white' }}><strong>Expense Name</strong></label>
                    <input type='text' className='form-control' placeholder='Enter Name' name='name' onChange={handleInput} required/>
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
                    <input type='text' className='form-control' placeholder='Enter Amount' name='amount' onChange={handleInput} required/>
                </div>

                <button type='submit' className='btn btn-success'>Add</button>
                <br></br>
            </form>
        </div>
        </div>
    );
}

export default AddExpense;
