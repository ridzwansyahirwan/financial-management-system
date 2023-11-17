import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './UsersValidation';
import '../style/dashboard.css';
import backgroundImage from './latar.jpg';
import logoImage from './logo.png';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function Login() {

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const [values, setValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);

    if (Object.values(err).every((val) => val === '')) {
      axios.post('http://localhost/fms-backend/login.php', values)
        .then((res) => {
          if (res.data.errors) {
            setBackendError(res.data.errors);
          } else {
            setBackendError([]);
            if (res.data.message === 'Login successful') {
                navigate('/Dashboard');
            } else if (res.data.error === 'Invalid password') {
                alert('Invalid password');
            } else if (res.data.error === 'Invalid email') {
                alert('Invalid email');
            } else {
                console.error('Unexpected response:', res.data);
            }
          }
        })
        .catch((err) => console.log(err));
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
            <h2 style={{ color:'white' }}>Log In</h2>
            {backendError.length > 0 &&
              backendError.map((e, index) => (
                <p key={index} className='text-danger'>
                  {e.msg}
                </p>
              ))}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label' style={{ color:'white' }}><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='form-control' />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label' style={{ color:'white' }}><strong>Password</strong></label>
                <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} className='form-control' />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
              <div className='mb-3'>
                <button type='submit' className='btn btn-success me-2'>Log In</button>
                <Link to='/Register' className='btn btn-secondary'>Create Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
