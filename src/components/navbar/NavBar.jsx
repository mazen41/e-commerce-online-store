import React,{useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './navbar.css'
import { useCart, CartProvider } from '../../cart_count';
import Cookies from 'js-cookie';
import { ArrowDownwardOutlined, ArrowRight } from '@mui/icons-material';

const NavBar = () => {
    const { cartCount } = useCart();
    const token = Cookies.get('token');
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [userInformation, setUserInformation] = useState(user);

    const navigate = useNavigate()
    const handlenavigate = () => {
        navigate("/cart")
    }
    console.log(cartCount);   
  return (
    <div className="nav_container">
        <div className="nav">
            <div className="logo">
                <h2>Coffeo</h2>
            </div>
            <div className="links">
                <ul>
                    <li>Products</li>
                    <li>Special Offers</li>
                    <li>The Process</li>
                    <li>Packing</li>
                    <li>About</li>
                </ul>
            </div>
            <div className="extra">
                <div className="icons">
                    <div className="search">
                        <img src="./icons/icons8-search-64.png" alt="" />
                    </div>
                    <div className="cart" onClick={handlenavigate}>
                        <img src="./icons/icons8-cart-32.png" alt="" />
                    </div>
                </div>
                {
                    token ? (
                        <div className="user" style={{"display" : "flex", "alignItems":"center", "gap" : "5px"}}>
                            <h2 style={{"fontWeight" : "400", "fontSize" : "20px"}}>{userInformation.name}</h2>
                            <span style={{"marginTop" : "8px"}}><ArrowDownwardOutlined /></span>
                        </div>
                    ) : (
                        <div className="auth">
                    <button><span>Login</span>/<span>Register</span></button>
                </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}





export default NavBar;
