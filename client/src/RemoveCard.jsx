import React, { useState } from 'react';
import './Login.css';
import logo from "./assets/images/logo1.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logout from "./assets/images/logout.jpg";

function RemoveCard() {
    const [DressName, setName] = useState('');
    const [Prize, setPrize] = useState('');
    const [crossed, setCrossed] = useState('');
    const [off, setOff] = useState('');
    const [discription, setDiscription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.delete('http://localhost:3001/removeCard', {
                data: {
                    DressName,
                    Prize,
                    crossed,
                    off,
                    discription
                }
            });
            console.log(result);
            alert("Card removed successfully!");
            setName('');
            setPrize('');
            setCrossed('');
            setOff('');
            setDiscription('');
            setSelectedCategories([]);
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            navigate('/RemoveCard');
        } catch (err) {
            alert("Card not found!");
            console.error('Error removing card:', err);
        }
    };

    const toggleMenu = () => {
        const navList2 = document.querySelector('.nav-list2');
        navList2.classList.toggle('show');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        hamburgerMenu.classList.toggle('open');
    };


    const solve = () => {
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
                        <i className="bi bi-person-circle"></i> Remove Card
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="DressName">
                            <h3>
                                <i className="bi bi-person-circle"></i> Dress Name:
                            </h3>
                        </label>
                        <input
                            type="text"
                            id="DressName"
                            name="DressName"
                            placeholder="Enter Dressname"
                            required
                            value={DressName}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="prize">
                            <h3>
                                <i className="bi bi-envelope-at-fill"></i> Prize:
                            </h3>
                        </label>
                        <input
                            type="text"
                            id="prize"
                            name="prize"
                            placeholder="Enter Dress Prize"
                            required
                            value={Prize}
                            onChange={(e) => setPrize(e.target.value)}
                        />


                        <label htmlFor="crossed">
                            <h3>
                                Entered Crossed Prize:
                            </h3>
                        </label>
                        <input
                            type="text"
                            id="crossed"
                            name="crossed"
                            placeholder="Enter Crossed Prize"
                            value={crossed}
                            onChange={(e) => setCrossed(e.target.value)}
                        />

                        <label htmlFor="off">
                            <h3>
                                off percent:
                            </h3>
                        </label>
                        <input
                            type="number"
                            id="off"
                            name="off"
                            placeholder="Enter off percent"
                            required
                            value={off}
                            onChange={(e) => setOff(e.target.value)}
                        />

                        <label htmlFor="discription">
                            <h3>
                                Discription:
                            </h3>
                        </label>
                        <textarea
                            id="discription"
                            name="discription"
                            placeholder="Enter Dress Discription"
                            style={{ width: "100%", height: "100px" }}
                            required
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)}
                        />

                        <div className="wrap1">
                            <label style={{ marginRight: "20px" }}>
                                <input type="checkbox" name="category" value="home" onClick={solve} />
                                HOME
                            </label>
                            <label style={{ marginRight: "20px" }}>
                                <input type="checkbox" name="category" value="women" onClick={solve} />
                                WOMEN
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="kid" onClick={solve} />
                                KID
                            </label>
                        </div>

                        <div className="wrap">
                            <button type="submit" onClick={solve}>
                                Remove
                            </button>
                        </div>
                    </form>
                </div>
            </body>
        </div>
    );
}

export default RemoveCard;

