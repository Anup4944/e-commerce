import React, { Fragment, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const LoginSignUp = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./logo192.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const switcherTab = useRef(null);

  const handleOnLogin = (e) => {
    e.preventDefault();
    console.log("form submited");
  };
  const handleOnRegisterSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("register");
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
  return (
    <Fragment>
      <div className="LoginSignUp">
        <div className="LoginSignUpBox">
          <div>
            <div className="loginSignToggle">
              <p onClick={(e) => switchTab(e, "login")}>Login</p>
              <p onClick={(e) => switchTab(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={handleOnLogin}>
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
                type="email"
                placeholder="Enter your name"
                required
                value={name}
                onChange={handleOnChange}
              />
            </div>
            <div className="signUpEmail">
              <EmailIcon />
              <input
                type="email"
                placeholder="Enter your name"
                required
                value={email}
                onChange={handleOnChange}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Enter password"
                required
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
              // disabled={isLoading ? true : false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
