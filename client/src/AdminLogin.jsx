import React, { useState } from 'react';
import './Login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 

function AdminLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
      e.preventDefault()
      axios.post('http://localhost:3001/Adminlogin', { email, password })
          .then(result => {
              console.log(result);
              if (result.data.includes("Success")) { 
                  localStorage.setItem('email', email);
                  alert("Login Successful !");
                  navigate('/Admin');
              } else {
                alert("Invalid Login Credentials !");
                  console.error('Login failed.'); 
              }
          })
          .catch(err => console.error(err))
  }
  


  const solve = () => {

  };

  return (
    <div>
    <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"/>

    </head>
    <body style={{ alignItems: "center" }}>
    <div className="main">
      <h1>
        <i className="bi bi-box-arrow-in-right"></i> LOGIN FORM
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <h3>
            <i className="bi bi-envelope-at-fill"></i> Email:
          </h3>
        </label>
        <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="Enter your Email" 
        required 
        onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">
          <h3>
            <i className="bi bi-file-lock2"></i> Password:
          </h3>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="wrap">
          <button type="submit" onClick={solve}>
            Submit
          </button>
        </div>
      </form>
      <p>
        Not registered?
        <a href="AdminRegister" style={{ textDecoration: 'none' }}>
          Create an account
        </a>
      </p>
    </div>
    </body>
    </div>
  );
};

export default AdminLogin;
