import React, { useState } from 'react'
import './section.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Section = () => {
  return (
    <div className="section_contanier">
      <div className="left">
        <div className="texts">
          <div className="bg-text">
            <h2>COFFEE</h2>
          </div>
          <div className="md-text">
            <h3>An Online Coffee Store</h3>
          </div>
          <div className="sm-text">
            <p>Sip, savor, repeat. Elevate your coffee game with our premium blends. Explore now for a richer brew every morning!</p>
          </div>
        </div>
        <div className="buttons">
          <div className="button_1">
            <button>Explore Our Products <span><ArrowForwardIcon /></span></button>
          </div>
          <div className="button_2">
            <button><span>Login</span>/<span>Register</span></button>
          </div>
        </div>
        <div className="statistics">
          <div className="products_count">
            <p>Our Products</p>
            <h2>+1000</h2>
          </div>
          <div className="blur_line"></div>
          <div className="sales">
              <p>Total Sales</p>
              <h2>+340K</h2>
          </div>
          <div className="blur_line"></div>
          <div className="sales">
              <p>Total Sales</p>
              <h2>+340K</h2>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="background">
          <img src="./icons/depositphotos_82075190-stock-pho.png" alt="Error Finding Image In Icons" />
        </div>
      </div>
      
    </div>
  )
}

export default Section;