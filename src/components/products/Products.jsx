import React, { useState, useEffect } from "react";
import "./products.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ArrowLeftOutlined } from "@mui/icons-material";
import axios from "axios";
import NetflixLoader from "../../EcommerceProduct";
import Cookies from 'js-cookie';
import api from "../../api";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { updateCartCount } from '../../cart_count/CartContext';
import { useCart, CartProvider } from '../../cart_count';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState("accessories");
  const [className, setClassName] = useState('');
  const [cart, setCart] = useState();
  const [token, setToken] = Cookies.get('token') || "";
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [userInformation, setUserinformation] = useState(user);
  const navigate = useNavigate();

  const { updateCartCount } = useCart();
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleCart = async (item, quantity = 1) => {


    if (token) {
      try {
        const formData = new FormData();
        formData.append('id', item.id);
        formData.append('user_id', userInformation.id);
        formData.append('name', item.name);
        formData.append('image', item.image);
        formData.append('price', item.price);
        formData.append('offer', item.offer);

        await api.get('/sanctum/csrf-cookie');

        const response = await api.post('api/cart', formData, {
          headers: {
            'X-CSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
            'Content-Type': 'application/json',
          },
        });

        if (response) {
          updateCartCount(response.data.count)
          navigate('/')
        }
      } catch (error) {
        return error;
      }
    }
    else {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
        setCart(updatedCart);
      } else {
        updatedCart = [...cart, { ...item, quantity }];
        setCart(updatedCart);
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }



  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await api.get('/sanctum/csrf-cookie');
        const response = await api.get("api/products");
        setProducts(response.data.products);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handlePage = (type) => {
    setProductType(type);
  }
  return (
    <div className="products">
      <div className="gap">
        <div className="circle">
          <p></p>
        </div>
        <div className="col_line"></div>
      </div>
      <div className="title">
        <div className="md-title">
          <h2>Explore the recent Products</h2>
        </div>
        <div className="sm-title">
          <p>
            Sip, savor, repeat. Elevate your coffee game with our premium
            blends. Explore now for a richer brew every morning!
          </p>
        </div>
      </div>
      <div className="products_boxs">




        {loading ? (
          <div style={{ "marginLeft": "150px" }}>
            <NetflixLoader />
          </div>
        ) : (
          products && products.map((product) => (
            product && product.category === "coffee beans" ? (
              <div className="product" key={product.id}>
                <div className="product_image">
                  {product.image ? (
                    <img
                      src={`https://coffee-online-store.infinityfreeapp.com/images/product1.png`}
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="product_detail">
                  <p className="name">{product.name}</p>
                  <p className="price">${product.price}</p>
                </div>
                <div className="buy">
                  <p>
                    Add to cart{" "}
                    <span>
                      <ArrowForwardIcon />
                    </span>
                  </p>
                  <span style={{ color: "#9b9b9b" }}>
                    <FavoriteBorderIcon />
                  </span>
                </div>
              </div>
            ) : null
          ))
        )}
      </div>

      <div className="ad">
        <div className="left">
          <div className="ad_title">
            <h2>Check out our beset coffee beans</h2>
          </div>
          <div className="button">
            <button>
              Explore our products{" "}
              <span>
                <ArrowForwardIcon />
              </span>
            </button>
          </div>
        </div>
        <div className="right">
          <img src="./beans_bag.png" />
        </div>
      </div>
      <div className="gap">
        <div className="circle">
          <p></p>
        </div>
        <div className="col_line"></div>
      </div>
      <div className="title">
        <div className="md-title">
          <h2 className="special"><span>Weekend</span> Special Products</h2>
        </div>
        <div className="sm-title">
          <p>
            Check out with our daily special products that you can get with +%20 OFF
          </p>
        </div>
      </div>
      <div className="categories">
        <ul className="list">
          <li
            onClick={() => handlePage('accessories')}
            className={productType == 'accessories' ? 'active' : ''}
          >Accessories</li>
          <li
            onClick={() => handlePage('coffee beans')}
            className={productType == 'coffee beans' ? 'active' : ''}

          >Beans</li>
          <li
            onClick={() => handlePage('instant_coffee')}
            className={productType === 'instant_coffee' ? 'active' : ''}

          >Instant Coffee</li>
        </ul>
      </div>

      <div className="products_boxs">


        {/* {loading ? (
          <div style={{ "marginLeft": "150px" }}>
            <NetflixLoader />
          </div>
        ) : (
          products.map((product) => (
            product.category == productType ? (
              <div className="product" key={product.id}>
                <div className="product_image" style={{ "marginTop": "0" }}>
                  {product.image ? (
                    <img
                      src={`http://127.0.0.1:8000/images/${product.image}.png`}
                      alt=""
                      style={{ "width": "200px" }}
                      className=""
                    />
                  ) : null}
                  <div className="back"></div>
                  <div className="offer">
                    <p>%20</p>
                  </div>

                </div>
                <div className="product_detail speical">
                  <p className="name">{product.name}</p>
                  <p className="price"><span>${product.price}</span>${product.offer}</p>
                </div>
                <div className="buy" style={{ "gap": "184px" }}>
                  <p onClick={() => handleCart(product)}>
                    Add to cart{" "}
                    <span>
                      <ArrowForwardIcon />
                    </span>
                  </p>
                  <span style={{ color: "#9b9b9b" }}>
                    <FavoriteBorderIcon />
                  </span>
                </div>
              </div>
            ) : null
          ))
        )} */}
        {loading ? (
          <div style={{ "marginLeft": "150px" }}>
            <NetflixLoader />
          </div>
        ) : (
          products && products.map((product) => (
            product && product.category === productType ? (
              <div className="product" key={product.id}>
                <div className="product_image" style={{ "marginTop": "0" }}>
                  {product.image ? (
                    <img
                      src={`https://coffee-online-store.infinityfreeapp.com/images/${product.image}.png`}
                      alt=""
                      style={{ "width": "200px" }}
                      className=""
                    />
                  ) : null}
                  <div className="back"></div>
                  <div className="offer">
                    <p>%20</p>
                  </div>
                </div>
                <div className="product_detail speical">
                  <p className="name">{product.name}</p>
                  <p className="price"><span>${product.price}</span>${product.offer}</p>
                </div>
                <div className="buy" style={{ "gap": "184px" }}>
                  <p onClick={() => handleCart(product)}>
                    Add to cart{" "}
                    <span>
                      <ArrowForwardIcon />
                    </span>
                  </p>
                  <span style={{ color: "#9b9b9b" }}>
                    <FavoriteBorderIcon />
                  </span>
                </div>
              </div>
            ) : null
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
