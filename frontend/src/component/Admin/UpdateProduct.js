import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import {
  clearErrorAction,
  getProductDetailsAction,
  updateProductAction,
} from "../../Actions/productAction";
import Loader from "../Layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../Constants/productContants";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const dispatch = useDispatch();

  const { id } = useParams();

  const { error: UpdateErr, isLoading, isUpdated } = useSelector(
    (state) => state.product
  );
  const { error, product } = useSelector((state) => state.productDetails);

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

    dispatch(updateProductAction(id, myForm));
  };

  const handleOnImgSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    setOldImages([]);

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
    if (product && product._id !== id) {
      dispatch(getProductDetailsAction(id));
    } else {
      setName(product.name);
      setDesc(product.desc);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (UpdateErr) {
      toast.error(UpdateErr, {
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
    if (isUpdated) {
      toast.success("Product data has been updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [UpdateErr, dispatch, toast, isUpdated, error, product, id]);

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
                <h1>Update product</h1>

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
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
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
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        src={image.url}
                        key={index}
                        alt="Old Product Preview"
                      />
                    ))}
                </div>

                <div id="createProductFormImage">
                  {imagePreview.map((image, index) => (
                    <img src={image} key={index} alt="Product Preview" />
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

export default UpdateProduct;
