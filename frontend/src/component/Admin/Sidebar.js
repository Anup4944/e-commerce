import React from "react";
import logo from "../../images/moon-4.jpg";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { TreeItem, TreeView } from "@mui/lab";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PagesIcon from "@mui/icons-material/Pages";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="logoImg" />
      </Link>
      <Link to="/">
        <p>
          <HomeIcon /> Dashboard
        </p>
      </Link>

      <Link to="">
        <TreeView
          defaultCollapseIcon={<CloseFullscreenIcon />}
          defaultExpandIcon={<AspectRatioIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PagesIcon />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddBoxIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <AccountCircleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
