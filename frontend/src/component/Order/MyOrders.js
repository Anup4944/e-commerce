import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorAction, myOrdersAction } from "../../Actions/orderAction";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import "./MyOrders.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { isLoading, orders, error } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      filed: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            {" "}
            <ControlPointIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, i) => {
      rows.push({
        itemsQty: item.orderedItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
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
    dispatch(myOrdersAction());
  }, [dispatch, error, toast]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <ToastContainer />
          <Typography id="myOrderHeading">
            {user.name.split(" ")[0]}'s order
          </Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            className="myOrdersTable"
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
