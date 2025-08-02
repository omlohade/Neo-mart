import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import logo2 from "./assets/images/logo2.png";
import "./Home.css";
import axios from 'axios';

function Women({ selectedCategories }) {
    const [fetchedCards, setFetchedCards] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/cards', {
            params: {
                categories: 'women'
            }
        })
            .then(response => {
                setFetchedCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedCategories]);

    const message = () => {
        alert("You are not login !");
    };

    const toggleMenu = () => {
        const navList2 = document.querySelector('.nav-list2');
        navList2.classList.toggle('show');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        hamburgerMenu.classList.toggle('open');
    };

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
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav-list">
                    <li><a href="/">HOME</a></li>
                    <li className="dropdown">
                        <a href="/women">WOMEN</a>
                        <div className="dropdown-content">
                            <a href="#kurtasandsuits">Kurtas and Suits</a>
                            <a href="#kurtisandtunics">Kurtis and Tunics</a>
                            <a href="#sarees">Sarees</a>
                            <a href="#westernwear">Western Wear</a>
                            <a href="#palazzos">Palazzos</a>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="/kid">KID</a>
                        <div className="dropdown-content">
                            <a href="#boysclothing">Boys clothing</a>
                            <a href="#girlsclothing">Girls clothing</a>
                        </div>
                    </li>
                </ul>
                <div className="rightnav">
                        <ul className="nav-list2">
                            <li className="dropdown">
                                <a href="#login">LogIn</a>
                                <div className="dropdown-content">
                                    <a href="/login">Customer Login</a>
                                    <a href="/AdminLogin">Admin Login</a>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#register">SignUp</a>
                                <div className="dropdown-content">
                                    <a href="/register">Customer SignUp</a>
                                    <a href="/AdminRegister">Admin SignUp</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="hamburger" id="hamburger-menu" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            </nav>

            <section className="firstsection" style={{ height: "450px" }}>
                <div className="item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
                    <img src={logo2} style={{ border: '10px solid white', borderRadius: '50px' }} alt="" />
                </div>
            </section>
            <div className="container">
                <div className="row">

                    {fetchedCards.map(card => (
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
                                        <div className="col-md-6">
                                            <button className="card-button bag-button" onClick={() => message()}>
                                                <div className="card-button-inner">cart</div>
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="card-button wish-button" onClick={() => message()}>
                                                <div className="card-button-inner">Wishlist</div>
                                            </button>
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

export default Women;




