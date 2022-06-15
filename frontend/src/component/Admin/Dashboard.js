import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllProdAdminAction,
  clearErrorAction,
} from "../../Actions/productAction.js";
Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.products);

  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
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

  const lineState = {
    labels: ["Intial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72,49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, product.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <ToastContainer />

        <div className="dashboardSummary">
          <div>
            <p>
              Total amount <br /> $3000
            </p>
          </div>

          <div className="dashboardSummary2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{product && product.length}</p>
            </Link>
            <Link to="/admin/products">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>4</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState}></Line>
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState}></Doughnut>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
