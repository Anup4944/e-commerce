import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/moon-4.jpg";
import { FaUserAlt, FaSearch, FaCartPlus } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.5vmax"
      link1Color="rgb(40, 81, 167)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon={true}
      CartIconElement={FaCartPlus}
      profileIconUrl="/login"
      profileIconColor="rgb(40, 81, 167)"
      searchIconColor="green"
      cartIconColor="red"
      profileIconColorHover="black"
      searchIconColorHover="black"
      cartIconColorHover="black"
      cartIconMargin="1vmax"
    />
  );
};

export default Header;
