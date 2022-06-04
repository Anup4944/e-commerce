import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginSignUp from "../User/LoginSignUp";

const PrivateRoute = () => {
  const { isAuth, isLoading } = useSelector((state) => state.user);
  return (
    <Fragment>{!isLoading && (isAuth ? <Outlet /> : <LoginSignUp />)}</Fragment>
  );
};

export default PrivateRoute;
