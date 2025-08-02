import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import image1 from "./assets/images/1.jpg";
import image2 from "./assets/images/2.jpg";
import image3 from "./assets/images/3.jpg";
import image4 from "./assets/images/4.jpg";
import image5 from "./assets/images/5.jpg";
import logout from "./assets/images/logout.jpg";
import axios from 'axios';
import { useCart } from './Components/CartContext';

function Customer({ selectedCategories }) {
    const [fetchedCards, setFetchedCards] = useState([]);
    const { addToCart } = useCart();
    const [active, setActive] = useState(0);
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    useEffect(() => {
        axios.get('http://localhost:3001/cards', {
            params: {
                categories: 'home'
            }
        })
            .then(response => {
                setFetchedCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedCategories]);

        const handleNextClick = () => {
                setActive(prevActive => (prevActive + 1) % 5);
            };
        
            const handlePrevClick = () => {
                setActive(prevActive => (prevActive - 1 + 5) % 5);
            };

            function addToWishlist(card) {
                const profileData = JSON.parse(localStorage.getItem('profileData'));
                if (profileData) {
                    axios.post('http://localhost:3001/addToWishlist', {
                        email: profileData.email,
                        item: card
                    })
                    .then(response => {
                        console.log(response.data.message);
                        alert("Wishlisted Successfully !");
                     
                    })
                    .catch(error => {
                        console.error('Error adding item to wishlist:', error);
                        
                    });
                } else {
                   
                }
            }
    function handleLogout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = '/';
        }
    }

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
                    <li><a href="/customer">HOME</a></li>
                    <li className="dropdown">
                        <a href="/customerWomen">WOMEN</a>
                        <div className="dropdown-content">
                            <a href="#kurtasandsuits">Kurtas and Suits</a>
                            <a href="#kurtisandtunics">Kurtis and Tunics</a>
                            <a href="#sarees">Sarees</a>
                            <a href="#westernwear">Western Wear</a>
                            <a href="#palazzos">Palazzos</a>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="/CustomerKid">KID</a>
                        <div className="dropdown-content">
                            <a href="#boysclothing">Boys clothing</a>
                            <a href="#girlsclothing">Girls clothing</a>
                        </div>
                    </li>
                </ul>
                <div className="rightnav">
                    <ul className="nav-list2">
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/wishlist">Wishlist</a></li>
                        <li><a href="/cart">Cart</a></li>
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
                            </div>
                            <div className="item" style={{ width: `${100 / 5}%` }}>
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
                                    {/* <div className="surprise-bubble">
                                        <span className="dress-card-heart">
                                            <i className="fa fa-heart"></i>
                                        </span>
                                        <a href="#">
                                            <span>More</span>
                                        </a>
                                    </div> */}
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
                                            <button className="card-button bag-button" onClick={() => addToCart(card, profileData)}>
                                                <div className="card-button-inner">cart</div>
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="card-button wish-button" onClick={() => addToWishlist(card)}>
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

export default Customer;

