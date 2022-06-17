import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Quick links</h4>
        <ul>
          <Link to="/">
            <li>Home </li>
          </Link>
          <Link to="/products">
            <li>Products </li>
          </Link>
          {isAuth ? (
            <>
              <Link to="/account">
                <li>Account </li>
              </Link>
              <Link to="/order">
                <li>Orders </li>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <li>Login </li>
            </Link>
          )}
        </ul>
      </div>

      <div className="midFooter">
        <p>High quality is our priority</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="www.instagram.com">Instgram</a>
        <a href="www.fb.com">Facebook</a>
        <a href="www.twitter.com">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
