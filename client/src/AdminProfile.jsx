import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from "./assets/images/logo1.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logout from "./assets/images/logout.jpg";

function AdminProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Profile component mounted");
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        console.log("Stored name:", storedName);
        console.log("Stored email:", storedEmail);
        if (storedName && storedEmail) {
            setName(storedName);
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/AdminRegister', { name, email, dob, age, phoneNumber, address })
            .then(result => {
                console.log(result);
                alert("Profile updated successfully!");
                navigate('/AdminProfile');
            })
            .catch(err => console.error('Error saving profile:', err));
    };

    const toggleMenu = () => {
        const navList2 = document.querySelector('.nav-list2');
        navList2.classList.toggle('show');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        hamburgerMenu.classList.toggle('open');
    };

    function handleLogout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = '/';
        }
    }
    return (
        <div>
            <body style={{ display: "inline", alignItems: "center", paddingBottom: "50px" }}>
                <nav className="navbar background" style={{ alignItems: "normal", paddingBottom: "50px" }}>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="nav-list">
                        <li><a href="/Admin">HOME</a></li>
                        <li className="dropdown">
                            <a href="/AdminWomen">WOMEN</a>
                            <div className="dropdown-content">
                                <a href="#kurtasandsuits">Kurtas and Suits</a>
                                <a href="#kurtisandtunics">Kurtis and Tunics</a>
                                <a href="#sarees">Sarees</a>
                                <a href="#westernwear">Western Wear</a>
                                <a href="#palazzos">Palazzos</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="/AdminKid">KID</a>
                            <div className="dropdown-content">
                                <a href="#boysclothing">Boys clothing</a>
                                <a href="#girlsclothing">Girls clothing</a>
                            </div>
                        </li>
                    </ul>
                    <div className="rightnav" style={{ fontSize: '15px' }}>
                        <ul className="nav-list2">
                            <li><a href="/AdminProfile">Profile</a></li>
                            <li><a href="/AddCard">Add Card</a></li>
                            <li><a href="/RemoveCard">Remove Card</a></li>
                            <li><a href="/orders">Orders</a></li>
                            <button style={{ backgroundColor: "white" }} onClick={handleLogout}><img style={{ height: "50px", width: "50px" }} src={logout} /></button>
                        </ul>
                    </div>
                    <div className="hamburger" id="hamburger-menu" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>
            </body>
            <body style={{ alignItems: "center", justifyContent: "center", display: "flex", paddingBottom: "50px" }}>
                <div className="main">
                    <h1>
                        <i className="bi bi-person-circle"></i> Profile Information
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <h3>
                                <i className="bi bi-person-circle"></i> Username:
                            </h3>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Username"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="email">
                            <h3>
                                <i className="bi bi-envelope-at-fill"></i> Email:
                            </h3>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <label htmlFor="dob">
                            <h3>
                                Date of Birth:
                            </h3>
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            required
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />

                        <label htmlFor="age">
                            <h3>
                                Age:
                            </h3>
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter your age"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />

                        <label htmlFor="phoneNumber">
                            <h3>
                                Phone Number:
                            </h3>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <label htmlFor="address">
                            <h3>
                                Address:
                            </h3>
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            style={{ width: "100%", height: "100px" }}
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <div className="wrap">
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </body>
        </div>
    );
}

export default AdminProfile;

