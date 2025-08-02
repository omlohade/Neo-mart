import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import image1 from "./assets/images/1.jpg";
import image2 from "./assets/images/2.jpg";
import image3 from "./assets/images/3.jpg";
import image4 from "./assets/images/4.jpg";
import image5 from "./assets/images/5.jpg";
import "./Home.css";
import axios from 'axios';

function Index({ selectedCategories }) {
    const [fetchedCards, setFetchedCards] = useState([]);
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

    const toggleMenu = () => {
        const navList2 = document.querySelector('.nav-list2');
        navList2.classList.toggle('show');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        hamburgerMenu.classList.toggle('open');
    };

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

    const message = () => {
        alert("You are not login !");
    };

    return (
        <div>
            <head>
                <title>Index Page</title>
                <link rel="stylesheet" href="Home.css" />
               
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            </head>
            <body style={{ display: "inline", alignItems: "center", paddingBottom: "50px" }}>
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
                                    {/* <a href="/AdminRegister">Admin SignUp</a> */}
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
                <ins className="adsbygoogle"
                     style={{ display: "block" }}
                     data-ad-client="ca-pub-3741717086350527"
                     data-ad-slot="6858242109"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3741717086350527"
                        crossorigin="anonymous"></script>
                <script>
                    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                </script>
            </body>
        </div>
    );
}

export default Index;
