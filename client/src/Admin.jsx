import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import image1 from "./assets/images/1.jpg";
import image2 from "./assets/images/2.jpg";
import image3 from "./assets/images/3.jpg";
import image4 from "./assets/images/4.jpg";
import image5 from "./assets/images/5.jpg";
import logout from "./assets/images/logout.jpg";
import "./Home.css";
import axios from 'axios';

function Admin({ selectedCategories }) {

    const [active, setActive] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActive(prevActive => (prevActive + 1) % 5);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNextClick = () => {
        setActive(prevActive => (prevActive + 1) % 5);
    };

    const handlePrevClick = () => {
        setActive(prevActive => (prevActive - 1 + 5) % 5);
    };

    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/cards', {
            params: {
                categories: 'home'
            }
        })
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedCategories]);

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
            <head>
                <title>Women Page</title>
                <link rel="stylesheet" href="Home.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            </head>
            <nav className="navbar background">
                <div className="logo">
                    <img src={logo}  alt="Logo" />
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
                <div className="rightnav" style={{fontSize:'15px'}}>
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

            <section className="firstsection" style={{ height: "550px" }}>
                <div className="box-main">
                    <div className="slider">
                        <div className="list" style={{ width: `${5 * 100}%`, transform: `translateX(-${active * (100 / 5)}%)` }}>
                            <div className="item" style={{ width: `${100 / 5}%` }}>
                                <img src={image1} alt="" style={{ width: "100%" }} />
                            </div>
                            <div className="item" style={{ width: `${100 / 5}%` }}>
                                <img src={image2} alt="" style={{ width: "100%" }} />
                            </div>
                            <div className="item" style={{ width: `${100 / 5}%` }}>
                                <img src={image3} alt="" style={{ width: "100%" }} />
                            </div>                             <div className="item" style={{ width: `${100 / 5}%` }}>
                                <img src={image4} alt="" style={{ width: "100%" }} />
                            </div>
                            <div className="item" style={{ width: `${100 / 5}%` }}>
                                <img src={image5} alt="" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="buttons">
                            <button id="prev" onClick={handlePrevClick}>&lt;</button>
                            <button id="next" onClick={handleNextClick}>&gt;</button>
                        </div>
                        <ul className="dots">
                            {Array.from({ length: 5 }, (_, index) => (
                                <li key={index} className={index === active ? 'active' : ''} onClick={() => setActive(index)}></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>


            <div className="container">
                <div className="row">

                    {cards.map(card => (
                        <div key={card._id} className="col-md-3">
                            <div className="dress-card">
                                <div className="dress-card-head">
                                    <img
                                        className="dress-card-img-top"
                                        src={`http://localhost:3001/${card.image}`}
                                        alt={card.DressName}
                                        onError={(e) => { e.target.src = placeholderImage; }} 
                                    />
                                </div>
                                <div className="dress-card-body">
                                    <h4 className="dress-card-title">{card.DressName}</h4>
                                    <p className="dress-card-para">{card.discription}</p>
                                    <p className="dress-card-para">
                                        <span className="dress-card-price">Rs.{card.Prize}&ensp;</span>
                                        <span className="dress-card-crossed">Rs.{card.crossed}</span>
                                        <span className="dress-card-off">&ensp;({card.off}% OFF)</span>
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6 card-button">
                                            <a href="#">
                                                <div className="card-button-inner bag-button">cart</div>
                                            </a>
                                        </div>
                                        <div className="col-md-6 card-button">
                                            <a href="#">
                                                <div className="card-button-inner wish-button">Wishlist</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin;

