import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegistrationValidation';
import axios from 'axios';
import '../style/dashboard.css';
import backgroundImage from './latar.jpg';
import logoImage from './logo.png';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Register() {

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting form with data:', values);
  
    const err = Validation(values);
    setErrors(err);
  
    if (Object.values(err).every((val) => val === '')) {
        axios.post('http://localhost/fms-backend/register.php', {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
        })
        .then((res) => {
          console.log('Registration successful:', res.data);
          alert('Registration successful');
          navigate('/');
        })
        .catch((err) => {
          console.log('Backend error:', err.response.data);
          setBackendError([err.response.data.message]);
        });
    }
  };

  return (
    <div className="header" style={backgroundStyles}>
      <div className="navbar">
        <img src={logoImage} className="logo" alt="Logo" />
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
          <h2 style={{ color:'white' }}>Register</h2>
          {backendError.length > 0 &&
            backendError.map((e, index) => (
              <p key={index} className='text-danger'>
                {e}
              </p>
            ))}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label' style={{ color:'white' }}><strong>Name</strong></label>
              <input type='text' placeholder='Enter Name' name='name' onChange={handleInput} className='form-control rounded-0' />
              {errors.name && <span className='text-danger'> {errors.name}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label' style={{ color:'white' }}><strong>Email</strong></label>
              <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
              {errors.email && <span className='text-danger'> {errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label' style={{ color:'white' }}><strong>Password</strong></label>
              <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
              {errors.password && <span className='text-danger'> {errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success me-2'>Register</button>
            <Link to='/Login' className='btn btn-secondary'>Login</Link>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
