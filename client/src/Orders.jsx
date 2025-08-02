import React, { useState, useEffect } from 'react';
import logo from "./assets/images/logo1.png";
import "./Home.css";
import logout from "./assets/images/logout.jpg";
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getOrders');
     
      const filteredOrders = response.data.filter(order => order.totalBill > 0);
     
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  const markOrderCompleted = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3001/markOrderCompleted/${orderId}`);
      
      alert("Order Completed Successfully");
      fetchOrders();
    } catch (error) {
      console.error('Error marking order as completed:', error);
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

      <div>
        <h1>Order Details</h1>
        {orders.map(order => (
          <div key={order._id} style={{ margin: '30px' }}>
            <h2 style={{ fontSize: '14px' }}>Customer Name: {order.customerName}</h2>
            <h2 style={{ fontSize: '14px' }}>Address: {order.address}</h2>
            <h2 style={{ fontSize: '14px' }}>Total Bill: {order.totalBill}</h2>
            <h2 style={{ fontSize: '14px' }}>Items:</h2>
            <div className="container">
              <div className="row">
                {order.items.map(item => (
                  <div key={item._id} className="col-md-3">
                    <div className="dress-card">
                      <div className="dress-card-head">
                        <img
                          className="dress-card-img-top"
                          src={`http://localhost:3001/${item.image}`}
                          alt={item.DressName}
                        />
                      </div>
                      <div className="dress-card-body" style={{ fontSize: '14px' , marginTop: '10px'}}>
                        <h4 className="dress-card-title" style={{ fontSize: '16px', marginBottom: '10px' }}>{item.DressName}</h4>
                        <p className="dress-card-para" style={{ fontSize: '14px', marginBottom: '10px' }}>{item.discription}</p>
                        <p className="dress-card-para" style={{ fontSize: '14px' }}>
                          <span className="dress-card-price" style={{ fontSize: '16px' }}>{item.Prize}&ensp;</span>
                          <span className="dress-card-crossed" style={{ fontSize: '14px' }}>{item.crossed}</span>
                          <span className="dress-card-off" style={{ fontSize: '14px' }}>&ensp;({item.off}% OFF)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => markOrderCompleted(order._id)}>Order Completed</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Orders;
