import './App.css';
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
// import Login  from './components/login/Login';
import NavBar from './components/navbar/NavBar';
import Section from './components/section/Section';
import Products from './components/products/Products';
import About from './components/about/About';
import Ad from './components/ad/Ad';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';
import {BrowserRouter , Route, Routes} from 'react-router-dom';
import Register from './components/register/Register';
import Signin from './components/signin/Signin';
import Profile from './components/profile/Profile';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="navbar">
                <NavBar />
              </div>
              <div className="section">
                <Section />
              </div>
              <div className="line">
                <p className='first'>ffee</p>
                <p className='disapeld'>Coffee</p>
                <p>Coffee</p>
                <p className='last'>Coff</p>
              </div>
              <div className="products_container">
                <Products />
              </div>
              <div className="about_container">
                <About />
              </div>
              <div className="ad_container">
                <Ad />
              </div>
              <div className="footer_container">
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <div className="navbar">
                <NavBar />
              </div>
              <div className="container">
                <Cart />
              </div>
            </>
          }
        />
         <Route
          path="/register"
          element={
            <>
              <div className="navbar">
                <NavBar />
              </div>
              <div className="register">
                <Register />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <div className="navbar">
                <NavBar />
              </div>
              <div className="register">
                <Signin />
              </div>
            </>
          }
        />
         <Route
          path="/profile"
          element={
            <>
              <div className="profile">
                <Profile />
              </div>
            </>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
