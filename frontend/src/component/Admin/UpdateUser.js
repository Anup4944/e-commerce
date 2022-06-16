import React, { Fragment, useState, useEffect } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../Constants/userConstant";
import {
  clearErrorAction,
  updateUserAction,
  userDetailsAction,
} from "../../Actions/userAction";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();

  const { error, isLoading, user } = useSelector((state) => state.userDetails);

  const { error: updErr, isLoading: updLoading, isUpdated } = useSelector(
    (state) => state.profile
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    await dispatch(updateUserAction(id, myForm));
    dispatch(userDetailsAction(id));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(userDetailsAction(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
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
    if (updErr) {
      toast.error(updErr, {
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
    if (isUpdated) {
      toast.success("User data updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({ type: UPDATE_USER_RESET });
    }

    // dispatch(userDetailsAction(id));
  }, [error, dispatch, toast, user, id, isUpdated, updErr]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <ToastContainer />
          {isLoading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={handleOnSubmit}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disbaled={
                  updLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
