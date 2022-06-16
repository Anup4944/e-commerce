import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearErrorAction,
  deleteOrdersAction,
  getAllOrdersAction,
} from "../../Actions/orderAction";
import { DELETE_ORDER_RESET } from "../../Constants/orderConstant";

const OrderList = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: dltErr, isDeleted } = useSelector((state) => state.order);

  const handleOnDelete = (id) => {
    dispatch(deleteOrdersAction(id));
  };

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
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => handleOnDelete(params.getValue(params.id, "id"))}
            >
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderedItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
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
    if (dltErr) {
      toast.error(dltErr, {
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
    if (isDeleted) {
      toast.success("Order has been deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrdersAction());
  }, [dispatch, error, toast, dltErr, isDeleted]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <ToastContainer />
          <h1 id="productListHeading">Order managment</h1>

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

export default OrderList;
