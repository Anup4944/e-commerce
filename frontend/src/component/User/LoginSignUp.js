import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  clearErrorAction,
  registerAction,
  clearMsgAction,
} from "../../Actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoPhoto from "../../images/bbb.jpg";

const LoginSignUp = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");

  const [avatar, setAvatar] = useState(NoPhoto);
  const [avatarPreview, setAvatarPreview] = useState(NoPhoto);

  const location = useLocation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const switcherTab = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, isAuth, error, message } = useSelector(
    (state) => state.user
  );

  const handleOnLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginEmail, passwordEmail));
  };

  const handleOnRegisterSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerAction(myForm));
  };

  const handleOnChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrorAction());
    }

    if (isAuth) {
      navigate(redirect);
    }

    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearMsgAction());
    }
  }, [dispatch, error, toast, navigate, isAuth, message, redirect]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className="LoginSignUp">
            <div className="LoginSignUpBox">
              <div>
                <div className="loginSignToggle">
                  <p onClick={(e) => switchTab(e, "login")}>Login</p>
                  <p onClick={(e) => switchTab(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="loginForm"
                ref={loginTab}
                onSubmit={handleOnLogin}
              >
                <div className="loginEmail">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Enter email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Enter password"
                    required
                    value={passwordEmail}
                    onChange={(e) => setPasswordEmail(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot password</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={handleOnRegisterSubmit}
              >
                <div className="signUpName">
                  <AccountBoxIcon />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="signUpEmail">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    name="email"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Enter password"
                    required
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                  />
                </div>

                <div id="registerImg">
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleOnChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Register"
                  className="signBtn"
                  disabled={isLoading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
