import React from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
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
        data: [2, 10],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total amount <br /> $3000
            </p>
          </div>

          <div className="dashboardSummary2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>400</p>
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
