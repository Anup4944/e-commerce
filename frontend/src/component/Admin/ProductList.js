import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAction,
  getAllProdAdminAction,
} from "../../Actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.products);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            // onClick={() =>
            //   deleteProductHandler(params.getValue(params.id, "id"))
            // }
            >
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

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
    dispatch(getAllProdAdminAction());
  }, [dispatch, error, toast]);
  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <ToastContainer />
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
