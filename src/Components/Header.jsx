import React from "react";
import logo from "../../public/assets/logo.png";
import { motion } from "motion/react";

function Header() {
  return (
    <>
      <img
        id="logo"
        src={logo}
        style={{
          width: "50px",
          height: "50px",
          paddingTop: "5px",
          marginTop: "10px",
        }}
      />
      <h1 className="header">The Daily Gratitude App</h1>
    </>
  );
}

export default Header;
