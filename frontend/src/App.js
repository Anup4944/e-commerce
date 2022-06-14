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
import Shipping from "./component/Cart/Shipping.js";
import Payment from "./component/Cart/Payment.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Cart/Success.js";

function App() {
  const { user, isAuth } = useSelector((state) => state.user);

  const [key, setKey] = useState("");

  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/stripekey");
    setKey(data.stripeKey);
  };

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUserAction());

    getStripeKey();
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
          <Route extact path="/shipping" element={<Shipping />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route extact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route extact path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route extact path="/success" element={<Success />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            extact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(key)}>
                <Payment />{" "}
              </Elements>
            }
          />
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
