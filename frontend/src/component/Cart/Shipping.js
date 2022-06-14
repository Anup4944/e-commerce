import React, { Fragment, useState } from "react";
import "./ShippingInfo.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import CheckOutSteps from "../Cart/CheckOutSteps.js";
import { saveShipppingAction } from "../../Actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shipping = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [suburb, setSuburb] = useState(shippingInfo.suburb);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone number must be 10 digit long", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    dispatch(
      saveShipppingAction({ address, suburb, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckOutSteps activeStep={0} />
      <ToastContainer />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={handleOnSubmit}
          >
            <div>
              <HomeWorkIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Suburb"
                required
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
              />
            </div>

            <div>
              <LocalShippingIcon />
              <input
                type="number"
                placeholder="Post code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <LocalPhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <FlagCircleIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <FlagCircleIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
