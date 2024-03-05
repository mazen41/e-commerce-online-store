import React, { useState, useEffect } from "react";
import api from "../../api";
import Cookies from "js-cookie"; // Import the Cookies library
import { ArrowRightAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { useCart } from "../../cart_count";
const Register = () => {
  const [token, setToken] = Cookies.get("token") || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { updateCartCount } = useCart();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const [errors, setErrors] = useState();

  const [cartData, setCartData] = useState(cart);
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
        console.log(error);
      }
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("api/register", formData, {
        headers: {
          "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.response.user)
        );
        Cookies.set("token", response.data.response.token, { expires: 365 });
        transferData(response.data.response.user.id);
        navigate("/");
      } else {
        // console.log("Registration failed:", response.data);
        return response.data;
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      setTimeout(() => {
        setErrors("");
      }, 3000);
    }
  };
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register_container">
      <div className="title">
        <h2>Register</h2>
        <p>Signup using email to access new features</p>
      </div>
      <div className="sm-line">
        <p>Login With Email</p>
      </div>

      <form onSubmit={handleRegister}>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <div className="input">
            <input
              type="text"
              placeholder="John"
              required
              id="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <div className="input">
            <input
              type="email"
              placeholder="eg@gamil.com"
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors && errors['email'] ? (
            <div className="error">{errors['email']}</div>
          ) : null}
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input
              type="password"
              placeholder="Enter A Password"
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>
        <div className="inputGroup">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <div className="input">
            <input
              type="password"
              placeholder="Confirm The Password"
              required
              id="password_confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          {errors && errors['password'] ? (
            <div className="error">{errors['password']}</div>
          ) : null}
        </div>
        <div className="button">
          <button>Create an account</button>
        </div>
        <div className="check">
          <p>
            Already Have an account ?{" "}
            <span>
              Login Now <ArrowRightAlt />
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
