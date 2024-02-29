import React from 'react'
import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <div className="footer">
      <ul className="links">
        <div className="privacy">
          <li><h3>Privacy</h3></li>
          <li><p>Terms of use</p></li>
          <li><p>Privacy policy</p></li>
          <li><p>Cookies</p></li>
        </div>
        <div className="services">
          <li><h3>Services</h3></li>
          <li><p>Shop</p></li>
          <li><p>Order ahead</p></li>
          <li><p>Menu</p></li>
        </div>
        <div className="footer_about">
          <li><h3>About us</h3></li>
          <li><p>Find a location</p></li>
          <li><p>About us</p></li>
          <li><p>Our story</p></li>
        </div>
        <div className="info">
          <li><h3>Information</h3></li>
          <li><p>Plans & Pricing</p></li>
          <li><p>Jobs</p></li>
          <li><p>Sell your product</p></li>
        </div>
        <div className="social">
         <li><h3>Social Media</h3></li>
         <div className="icons">
         <span><FacebookOutlinedIcon /></span>
         <span><InstagramIcon /></span>
         <span><TwitterIcon /></span>
         <span><YouTubeIcon /></span>
         <span><LinkedInIcon /></span>
         </div>
        </div>
      </ul>
    </div>
  )
}

export default Footer;