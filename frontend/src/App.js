import "./App.css";
import Header from "./component/Layout/Header/Header";
import Footer from "./component/Layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Products/Products.js";
import Search from "./component/Products/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUserAction } from "./Actions/userAction";
import UserOptions from "./component/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Update from "./component/User/Update.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";

function App() {
  const { user, isAuth } = useSelector((state) => state.user);
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUserAction());
  }, []);
  return (
    <Router>
      <Header />

      {isAuth && <UserOptions user={user} />}
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route extact path="/search" element={<Search />} />
        <Route extact path="/login" element={<LoginSignUp />} />
        <Route element={<PrivateRoute />}>
          <Route extact path="/account" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route extact path="/update" element={<Update />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route extact path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          extact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route extact path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
