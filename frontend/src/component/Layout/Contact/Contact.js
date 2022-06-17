import { Button } from "@mui/material";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:anuppoudel60@gmail.com">
        <Button>Contact: anuppoudel60@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
