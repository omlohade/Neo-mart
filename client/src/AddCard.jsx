import React, { useState } from 'react';
import './Login.css';
import logo from "./assets/images/logo1.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logout from "./assets/images/logout.jpg";

function AddCard() {
    const [DressName, setName] = useState('');
    const [Prize, setPrize] = useState('');
    const [crossed, setCrossed] = useState('');
    const [off, setOff] = useState('');
    const [discription, setDiscription] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('DressName', DressName);
        formData.append('Prize', Prize);
        formData.append('crossed', crossed);
        formData.append('off', off);
        formData.append('discription', discription);
        formData.append('image', image);
        formData.append('categories', JSON.stringify(selectedCategories));
        
        try {
            const result = await axios.post('http://localhost:3001/AddCard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(result);
            alert("Card added successfully!");
            setName('');
            setPrize('');
            setCrossed('');
            setOff('');
            setDiscription('');
            setImage(null);
            setSelectedCategories([]);
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            navigate('/AddCard');
        } catch (err) {
            console.error('Error adding card:', err);
        }
    };

    const solve = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedCategories(prevCategories => [...prevCategories, value]);
            console.log("checked")
        } else {
            setSelectedCategories(prevCategories => prevCategories.filter(category => category !== value));
        }
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
                        <i className="bi bi-person-circle"></i> Add Card
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
                        <label htmlFor="image">
                            <h3>
                                Dress Image:
                            </h3>
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className="wrap1">
                            <label style={{ marginRight: "20px" }}>
                                <input type="checkbox" name="category" value="home" onChange={solve} />
                                HOME
                            </label>
                            <label style={{ marginRight: "20px" }}>
                                <input type="checkbox" name="category" value="women" onChange={solve} />
                                WOMEN
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="kid" onChange={solve} />
                                KID
                            </label>
                        </div>

                        <div className="wrap">
                            <button type="submit">
                                Add
                            </button>
                        </div>

                    </form>
                </div>
            </body>
        </div>
    );
}

export default AddCard;

