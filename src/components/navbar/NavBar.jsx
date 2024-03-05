import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './navbar.css'
import { useCart, CartProvider } from '../../cart_count';
import Cookies from 'js-cookie';
import { ArrowDownwardOutlined, ArrowRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../api';
const NavBar = () => {
    const { cartCount } = useCart();
    const token = Cookies.get('token');
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [userInformation, setUserInformation] = useState(user);
    const [sideNavClass, setSideNavClass] = useState('side-nav');
    const [navOverlay, setNavOverlay] = useState(false);
    const handleShowNav = () => {
        setSideNavClass("side-nav active")
        setNavOverlay(true);
        document.body.style.overflow = "hidden";
    }
    const handleCloseNav = () => {
        setSideNavClass('side-nav')
        setNavOverlay(false);
        document.body.style.overflow = "";
    }
    const navigate = useNavigate()
    const handlenavigate = () => {
        navigate("/cart")
    }
    const handleProfileNav = () => {
        navigate('/profile');
    }
    const handleLogout = async () => {
        try {
            const formData = new FormData();
            formData.append('user_id', userInformation.id);
            await api.get("/sanctum/csrf-cookie");

            const response = await api.post('api/user/logout', formData, {
                headers: {
                    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                Cookies.remove('token');
                localStorage.removeItem('user');
                // navigate('/');
                window.location.reload();
            }
        } catch (error) {
            return error;
        }
    }
    const handleNavigateLogin = () => {
        navigate('/login')
    }
    const handleNavigateRegister = () => {
        navigate('/register')
    }
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
                        <li>About</li>
                    </ul>
                </div>
                <div className="extra">
                    <div className="icons">

                        <div className="cart" onClick={handlenavigate}>
                            <img src="./icons/icons8-cart-32.png" alt="" />
                            <p style={{ "position": "absolute", "bottom": "12px", "right": "-8px", "color": "#723e29" }}>{cartCount}</p>
                        </div>
                    </div>
                    {
                        token ? (
                            <div onClick={handleProfileNav} className="user" style={{ "display": "flex", "alignItems": "center", "gap": "5px" }}>
                                <h2 style={{ "fontWeight": "400", "fontSize": "1px", "cursor": " pointer" }}>{userInformation.name}</h2>
                            </div>
                        ) : (
                            <div className="auth">
                                <button><span onClick={handleNavigateLogin}>Login</span>/<span onClick={handleNavigateRegister}>Register</span></button>
                            </div>
                        )
                    }
                </div>

                <div className="lines" onClick={handleShowNav}>
                    <div className="nav-line"></div>
                    <div className="nav-line"></div>
                    <div className="nav-line"></div>
                </div>
            </div>
            {
                navOverlay && (
                    <div className="overlay"></div>
                )
            }
            {
                sideNavClass ? (
                    <div className={sideNavClass} id='side-nav'>
                        <div className="close" onClick={handleCloseNav}>
                            <span><CloseIcon /></span>
                        </div>
                        <div className="links">
                            <ul>
                                <li>Products</li>
                                <li>Special Offers</li>
                                <li>The Process</li>
                                <li>About</li>
                                <li onClick={handlenavigate}>Cart</li>
                                {
                                    token ? (
                                        <div className="sm-line"></div>
                                    ) : null
                                }
                                {
                                    token ? (
                                        <li onClick={handleProfileNav}>Profile</li>
                                    ) : null
                                }
                                {
                                    token ? (
                                        <div className="sm-line"></div>
                                    ) : null
                                }
                                {
                                    token ? (
                                        <li onClick={handleLogout}>Logout</li>
                                    ) : null
                                }
                            </ul>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}





export default NavBar;
