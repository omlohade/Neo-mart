import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "./assets/images/logo1.png";
import logo2 from "./assets/images/logo2.png";
import "./Home.css";
import logout from "./assets/images/logout.jpg";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [profileData, setProfileData] = useState(null); 

  useEffect(() => {
    const storedProfileData = JSON.parse(localStorage.getItem('profileData'));
    setProfileData(storedProfileData); 

    if (storedProfileData) {
      fetchWishlistInfo(storedProfileData.name, storedProfileData.address);
    }
  }, []);

  const fetchWishlistInfo = async (customerName, address) => {
    try {
      const response = await axios.get('http://localhost:3001/wishlistItems', {
        params: {
          customerName: customerName,
          address: address
        }
      });
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      // Make a DELETE request to the server to remove the item from the wishlist table
      await axios.delete(`http://localhost:3001/removeFromWishlist`, {
        data: {
          email: profileData.email,
          itemId: itemId
        }
      });

      const updatedWishlistItems = wishlistItems.filter(item => item._id !== itemId);
      setWishlistItems(updatedWishlistItems);

      alert("Removed Successfully from Wishlist");
      console.log('Item removed from the wishlist table:', itemId);
    } catch (error) {
      console.error('Error removing item from the wishlist table:', error);
    
    }
  };

  const toggleMenu = () => {
    const navList2 = document.querySelector('.nav-list2');
    navList2.classList.toggle('show');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburgerMenu.classList.toggle('open');
};

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      window.location.href = '/';
    }
  };

  return (
    <div>
      <head>
        <title>Wishlist Page</title>
        <link rel="stylesheet" href="Home.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <nav className="navbar background">
        <div className="logo">
          <img src={logo}  alt="Logo" />
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
            <a href="/customerKid">KID</a>
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

      <section className="firstsection" style={{ height: "450px" }}>
        <div className="item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
          <img src={logo2} style={{ border: '10px solid white', borderRadius: '50px' }} alt="" />
        </div>
      </section>
      <div className="container">
        <div className="row">

          {wishlistItems.map(item => (
            <div key={item._id} className="col-md-3">
              <div className="dress-card">
                <div className="dress-card-head">
                  <img
                    className="dress-card-img-top"
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.DressName}
                    onError={(e) => { e.target.src = placeholderImage; }}
                  />
                  
                </div>
                <div className="dress-card-body">
                  <h4 className="dress-card-title">{item.DressName}</h4>
                  <p className="dress-card-para">{item.discription}</p>
                  <p className="dress-card-para">
                    <span className="dress-card-price">Rs.{item.Prize}&ensp;</span>
                    <span className="dress-card-crossed">Rs.{item.crossed}</span>
                    <span className="dress-card-off">&ensp;({item.off}% OFF)</span>
                  </p>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button className="card-button bag-button" onClick={() => removeFromWishlist(item._id, profileData)}>
                        <div className="card-button-inner">Remove</div>
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

export default Wishlist;

