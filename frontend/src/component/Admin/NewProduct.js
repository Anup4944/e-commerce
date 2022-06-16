import React, { Fragment, useState, useEffect } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NEW_PRODUCT_RESET } from "../../Constants/productContants";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import {
  clearErrorAction,
  newProductAction,
} from "../../Actions/productAction";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, success, message } = useSelector(
    (state) => state.newProduct
  );

  const categories = [
    "Electronics",
    "Footwear",
    "Clothing",
    "Gaming",
    "Kitchen",
    "Household",
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("desc", desc);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(newProductAction(myForm));
  };

  const handleOnImgSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

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
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/dashboard");

      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [error, dispatch, toast, success, message]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <ToastContainer />
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={handleOnSubmit}
              >
                <h1>Add product</h1>

                <div>
                  <DriveFileRenameOutlineIcon />
                  <input
                    type="text"
                    placeholder="Product name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MonetizationOnIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <DescriptionIcon />
                  <textarea
                    type="text"
                    placeholder="Description"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                <div>
                  <CategoryIcon />
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value=""> Choose category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <DescriptionIcon />
                  <textarea
                    type="number"
                    placeholder="Stock"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={handleOnImgSelect}
                  />
                </div>

                <div id="createProductFormImage">
                  {imagePreview.map((image, index) => (
                    <img src={image} key={index} alt="Avatar Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disbaled={isLoading ? true : false}
                >
                  Publish
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewProduct;
