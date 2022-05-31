import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h3>Download our App</h3>
        <p>Download our App on Andriod and IOS</p>
        <img
          src="https://media.wired.com/photos/592697678d4ebc5ab806acf7/4:3/w_929,h_697,c_limit/GooglePlay.jpg"
          alt="playStore"
        />
        <img
          src="https://media.wired.com/photos/592697678d4ebc5ab806acf7/4:3/w_929,h_697,c_limit/GooglePlay.jpg"
          alt="playStore"
        />
      </div>

      <div className="midFooter">
        <h1>My e-commerce</h1>
        <p>High quality is our priority</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="www.instagram.com">Insta</a>
        <a href="www.instagram.com">Insta</a>
        <a href="www.instagram.com">Insta</a>
      </div>
    </footer>
  );
};

export default Footer;
