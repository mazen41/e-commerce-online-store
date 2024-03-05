import React, { useState } from 'react'
import api from '../../api';
import Cookies from 'js-cookie'; // Import the Cookies library
import { ArrowRightAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './signin.css';
import { useCart } from "../../cart_count";

const Signin = () => {
  const [token, setToken] = Cookies.get('token') || "";
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartData, setCartData] = useState(cart);
  const { updateCartCount } = useCart();
  const [error, setError] = useState();

  const transferData = async (userId) => {
    if (cartData !== "") {
      try {
        const requestData = cartData.map(async (item) => {
          const formData = new FormData();
          formData.append("id", item.id);
          formData.append("user_id", userId);
          formData.append("name", item.name);
          formData.append("image", item.image);
          formData.append("price", item.price);
          formData.append("offer", item.offer);

          await api.get("/sanctum/csrf-cookie");

          return await api.post("api/cart", formData, {
            headers: {
              "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
              "Content-Type": "application/json",
            },
          });

        });
        const responses = await Promise.all(requestData);

        responses.forEach((response) => {
          if (response) {
            updateCartCount(response.data.count);
          }
        });

        localStorage.removeItem('cart');

      } catch (error) {
        return error;
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      await api.get('/sanctum/csrf-cookie');

      const response = await api.post('api/login', formData, {
        headers: {
          'X-CSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        Cookies.set('token', response.data.token, { expires: 365 });
        transferData(response.data.user.id);

        navigate('/')
      } else {
        console.log('Login has failed:', response);
      }
    } catch (error) {
        setError(error.response.data.message);
    }
  }
  if (token) {
    return <Navigate to="/" />
  }
  return (
    <div className='register_container'>
      <div className="title">
        <h2>Login</h2>
        <p>Hi, Welcome back</p>
      </div>
      <div className="sm-line">
        <p>Login With Email</p>
      </div>

      <form onSubmit={handleLogin}>

        <div className="inputGroup">
          <label htmlFor="email">
            Email
          </label>
          <div className="input">
            <input type="email" placeholder='eg@gmail.com' required id='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          
        </div>

        <div className="inputGroup">
          <label htmlFor="password">
            Password
          </label>
          <div className="input">
            <input type="password" placeholder='Enter A Password' required id='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
         {
          error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : null
         }
        </div>

        <div className="button">
          <button>Login</button>
        </div>
        <div className="check">
          <p>Don't Have an account ? <span>Create an account <ArrowRightAlt /></span> </p>
        </div>
      </form>
    </div>
  )
}

export default Signin;