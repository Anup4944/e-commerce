import { Step, StepLabel, Stepper } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import PaymentsIcon from "@mui/icons-material/Payments";
import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      icon: <LocalShippingIcon />,
    },
    {
      icon: <AirplaneTicketIcon />,
    },
    {
      icon: <PaymentsIcon />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutSteps;
