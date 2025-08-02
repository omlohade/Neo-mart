import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './Components/CartContext';
import Index from './Index';
import Signup from './Signup';
import AdminRegister from './AdminRegister';
import Login from './Login';
import AdminLogin from './AdminLogin';
import Admin from './Admin';
import Customer from './Customer';
import CustomerKid from './CustomerKid';
import CustomerWomen from './CustomerWomen';
import Women from './Women';
import AdminWomen from './AdminWomen';
import Kid from './Kid';
import AdminKid from './AdminKid';
import Profile from './Profile';
import AdminProfile from './AdminProfile';
import AddCard from './AddCard';
import RemoveCard from './RemoveCard';
import Orders from './Orders';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Footer from './Components/Footer'; 

function App() {
  return (
    
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/customer" element={<Customer />} />
          <Route path="/customerWomen" element={<CustomerWomen />} />
          <Route path="/customerKid" element={<CustomerKid />} />
          <Route path="/women" element={<Women />} />
          <Route path="/AdminWomen" element={<AdminWomen />} />
          <Route path="/kid" element={<Kid />} />
          <Route path="/AdminKid" element={<AdminKid />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/RemoveCard" element={<RemoveCard />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </CartProvider>
  );
}

export default App;
