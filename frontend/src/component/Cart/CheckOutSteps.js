import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RecommendIcon from "@mui/icons-material/Recommend";
import PaymentsIcon from "@mui/icons-material/Payments";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography> Shipping Deatils </Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order </Typography>,
      icon: <RecommendIcon />,
    },
    {
      label: <Typography> Payment </Typography>,
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
          <Step key={index}>
            <StepLabel icon={item.icon}></StepLabel>
            {item.label}
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutSteps;
