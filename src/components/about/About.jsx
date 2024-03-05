import React from 'react'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import './about.css'
const About = () => {
  return (
    <div className='about'>
      <div className="image">
        <img src="./images/heart.png" alt="" />
        <div className="comment">
          <div className="icon">
            <img src="./icons/profile.jfif" alt="" />
          </div>
          <div className="title">
            <h2>Fahd Hossny</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint molestiae nostrum asperiores, natus facilis debitis, totam</p>
          </div>
        </div>
      </div>
      <div className="quilty">
        <div className="title">
          <h2>We care about the quality of our <span>Products</span></h2>
          <p>Drinking coffee is one of the most global things you do each days here i can spend a long and comfartable time with this workspace.</p>
        </div>
        <div className="grid">
          <div className="box">
            <div className="icon">
              <span><ForumOutlinedIcon /></span>
            </div>
            <div className="titles">
              <h2>Active Community</h2>
              <p>You can moach out whenever you want!</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <span><EmojiObjectsOutlinedIcon /></span>

            </div>
            <div className="titles">
              <h2>Best product design we</h2>
              <p>we worked a lot to make a great experince</p>
            </div>
          </div>

          <div className="box">
            <div className="icon">
              <span><DynamicFeedOutlinedIcon /></span>

            </div>
            <div className="titles">
              <h2>Premium Quality</h2>
              <p>A premium quality coffee is what out customers deserve!</p>
            </div>
          </div>

          <div className="box">
            <div className="icon">
              <span><CardGiftcardOutlinedIcon /></span>
            </div>
            <div className="titles">
              <h2>The best material</h2>
              <p>Our product is made by premium materials!</p>
            </div>
          </div>
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
    </div>
  )
}

export default About;