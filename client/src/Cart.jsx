import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import logo2 from "./assets/images/logo2.png";
import "./Home.css";
import BillDetails from './Components/BillDetails';
import logout from "./assets/images/logout.jpg";
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [address, setAddress] = useState('');
  const [showBill, setShowBill] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const profileData = JSON.parse(localStorage.getItem('profileData'));

  useEffect(() => {
    if (profileData) {
      fetchCustomerInfo(profileData.name, profileData.address);
    }
  }, []);


  const fetchCustomerInfo = (customerName, address) => {
    
    axios.get('http://localhost:3001/orderInfo', {
        params: {
            customerName: customerName,
            address: address
        }
    })
    .then(response => {
        const order = response.data;
        console.log(order);
        if (order) {
            
            fetchCartItems(order._id); 
            
            setAddress(order.address);
        } else {
            console.log('Order not found for customer:', customerName);
        }
    })
    .catch(error => {
        console.error('Error fetching customer order information:', error);
    });
};


const fetchCartItems = (orderId) => {
  
  console.log('Fetching cart items for orderId:', orderId);

  axios.get('http://localhost:3001/orderItems', {
      params: {
          orderId: orderId
      }
  })
  .then(response => {
      const cartItems = response.data;
      console.log("cartitems", cartItems);
      
      setCartItems(cartItems);
      
      calculateTotalBill(cartItems);
  })
  .catch(error => {
      console.error('Error fetching cart items:', error);
  });
};


const handleProceedToBuy = () => {
  
  const calculatedTotalBill = calculateTotalBill(cartItems);
  
  setTotalBill(calculatedTotalBill);

  setShowBill(true);


  const orderData = {
    customerName: profileData.name,
    address: address,
    items: cartItems,
    totalBill: calculatedTotalBill 
  };

  axios.post('http://localhost:3001/placeOrder', orderData) 
    .then(response => {
      alert("Order Placed Successfully");
      console.log('Order placed successfully:', response.data);
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
};


const calculateTotalBill = (items) => {
  let total = 0;
  items.forEach(item => {
    const itemPrize = parseFloat(item.Prize.replace(/\D/g, ''));
    if (!isNaN(itemPrize)) {
      total += itemPrize;
    } else {
      console.log("Invalid Prize for item:", item);
    }
  });
  return total.toFixed(2);
};


const removeFromCart = (itemId) => {

  const updatedCartItems = cartItems.filter(item => item._id !== itemId);
  setCartItems(updatedCartItems);
  calculateTotalBill(updatedCartItems);
  alert("Card Removed Successfully !");


  axios.delete('http://localhost:3001/removeFromCart', {
    data: {
      email: profileData.email, 
      itemId: itemId
    }
  })
    .then(response => {
      console.log('Item removed successfully from order:', response.data);
    })
    .catch(error => {
      console.error('Error removing item from order:', error);
    });
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
      <head>
        <title>Cart Page</title>
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

          {cartItems.map(item => (
            <div key={item._id} className="col-md-3">
              <div className="dress-card">
                <div className="dress-card-head">
                  <img
                    className="dress-card-img-top"
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.DressName}
                  />
                  
                </div>
                <div className="dress-card-body">
                  <h4 className="dress-card-title">{item.DressName}</h4>
                  <p className="dress-card-para">{item.discription}</p>
                  <p className="dress-card-para">
                    <span className="dress-card-price">{item.Prize}&ensp;</span>
                    <span className="dress-card-crossed">{item.crossed}</span>
                    <span className="dress-card-off">&ensp;({item.off}% OFF)</span>
                  </p>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button className="card-button bag-button" onClick={() => removeFromCart(item._id)}>
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
      <div className="row justify-content-center">
        <button
          style={{ backgroundColor: '#f7b5c1', textAlign: 'center', width: '400px', color: 'white' }}
          onClick={handleProceedToBuy}
        >
          PROCEED TO BUY
        </button>
      </div>


      {showBill && <BillDetails totalBill={totalBill} address={address} />}


    </div>


  );
}

export default Cart;
