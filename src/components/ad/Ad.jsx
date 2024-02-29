import React from 'react'
import './Ad.css'
const Ad = () => {
    return (
        <div className='second_ad'>
            <div className='left'>
                <img src="./images/coffee_cup.png" alt="" />
            </div>
            <div className="middle">
                <div className="title">
                    <h2>Join in and get <span>%25 OFF!</span></h2>
                    <p>Subscribe to our website and get %25 OFF discount code.</p>
                </div>
                <div className="buttons">
                    <input type="email" name="" id="" placeholder="Email Address"/>
                    <button>
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="right">
                <img src="./images/beans.png" alt="" />
            </div>
        </div>
    )
}

export default Ad