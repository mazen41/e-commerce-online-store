import React, { useState, useEffect } from "react";
import "./cart.css";
import { ArrowBack, Remove, Clear, Add } from "@mui/icons-material";
import Cookies from "js-cookie";
import api from "../../api";
const Cart = () => {
  const token = Cookies.get("token");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartData, setCartData] = useState(cart);
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const [userInformation, setUserInformation] = useState(user);
  console.log(cartData);
  // const calculateTotalForItem = (item) => {
  //   const itemTotal = (item.price || 0) * (item.quantity || 0);
  //   return itemTotal;
  // };
  const calculateTotalForItem = (item) => {
    const itemTotal = (item.offer ? item.offer : item.price || 0) * (item.quantity || 0);
    return itemTotal;
  };
  const calculateTotalPrice = () => {
    const totalPrice = cartData
      ? cartData.reduce((total, cartItem) => {
          const itemTotal = calculateTotalForItem(cartItem);
          return total + itemTotal;
        }, 0)
      : "";

    return totalPrice;
  };
  console.log(cartData);
  const total = calculateTotalPrice() ? calculateTotalPrice() : "";
  const handleIncreaseOne = async (id) => {
    if (token) {
      try {
        const formData = new FormData();
        formData.append("user_id", userInformation.id);
        formData.append("id", id);
        const response = await api.post(`api/cart/increase`, formData);
        if (response) {
          setCartData((prevCartData) =>
            prevCartData.map((item) =>
              item.id === id
                ? { ...item, quantity: response.data.quantity }
                : item
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let updatedCart = cartData.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      setCartData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const handleDecreaseOne = async (id) => {
    if (token) {
      try {
        const formData = new FormData();
        formData.append("user_id", userInformation.id);
        formData.append("id", id);
        const response = await api.post(`api/cart/decrease`, formData);
        if (response) {
          setCartData((prevCartData) =>
            prevCartData.map((item) =>
              item.id === id
                ? { ...item, quantity: response.data.quantity }
                : item
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let updatedCart = cartData.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
          : cartItem
      );

      setCartData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const handleRemoveItem = async (id) => {
    if (token) {
      try {
        const formData = new FormData();
        formData.append("user_id", userInformation.id);
        formData.append("id", id);
        const response = await api.post(`api/cart/delete`, formData);
        if (response) {
          setCartData((prevData) => prevData.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
    let updatedCart = cartData.filter((cartItem) => cartItem.id !== id);

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  useEffect(() => {
    const fetchCartData = async () => {
      if (token) {
        try {
          const response = await api.get(
            `api/get/cart?user_id=${userInformation.id}`
          );

          if (response) {
            console.log(response);
            setCartData(response.data.cart);
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, [token, userInformation.id]);
  return (
    <div className="cart">
      <div className="top">
        <div className="title">
          <h2>Your Cart</h2>
        </div>
      </div>
      <div className="cart_list">
      <div className="border">
        <div className="title">
          <ul>
            <li className="first">Product Details</li>
            <li className="second">Quantity</li>
            <li className="price">Price</li>
            <li className="total">Total</li>
          </ul>
        </div>
        <div className="title_line"></div>
        <div className="products_container">
          {cartData ? (
            cartData.map((item, index) => {
              return (
                <div className="product">
                  <div className="image">
                    <img
                      src={`http://coffee-online-store.infinityfreeapp.com/images/${item.image}.png`}
                      alt=""
                    />
                    {/* <div className="name"> */}
                    <p>{item.name}</p>
                    {/* </div> */}
                    <div className="back"></div>
                  </div>
                  <div className="quantity">
                    <div className="background">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleIncreaseOne(item.id)}
                    >
                      <Add />
                    </span>
                    </div>
                    <p>{item.quantity}</p>
                    <div className="background">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDecreaseOne(item.id)}
                    >
                      <Remove />
                    </span></div>
                  </div>
                  <div className="price">
                    <p>${item.offer ? item.offer : item.price}</p>
                  </div>
                  <div className="total">
                    <p>
                      $
                      {item.offer
                        ? Math.floor(item.offer * item.quantity)
                        : Math.floor(item.price * item.quantity)}
                    </p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Clear />
                  </div>
                  {index !== cartData.length - 1 && <div className="line_ex"></div>}
                </div>
              );
            })
          ) : (
            <div className="msg">
              <h4>You Haven't Add Anything To Cart Yet!</h4>
            </div>
          )}
        </div>
        </div>
        {
          cartData && (
            <div className="check_out">
            <div className="title">
              <h2>Cart Summary</h2>
            </div>
            <div className="line_ey"></div>
            <div className="information">
              <div className="subtotal">
                <p>Subtotla</p>
                <p>${total}</p>
              </div>
              <div className="gitwrapping">
                <p>Gift Wrapping</p>
                <p>5$</p>
              </div>
              <div className="shipping">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="total">
                <p>Grand Total</p>
                <p>${total + 5}</p>
              </div>
              <div className="buttons">
                <button className="first">Keep Shopping</button>
                <button className="second">Check out</button>
              </div>
            </div>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
