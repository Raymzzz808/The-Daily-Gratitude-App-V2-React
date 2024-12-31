import React, { useState } from "react";
import "../public/styles.css";
import { MDBInput } from "mdb-react-ui-kit";
import Header from "./Components/Header";
import Entry from "./Components/Entry";
import Footer from "./Components/Footer";
import EntryButton from "./Components/EntryButton";
import Login from "./Components/Login";
import logo from "../public/assets/logo.png";
import Meditate from "./Components/Meditate";
import Thoughts from "./Components/Thoughts";
import Register from "./Components/Register";
import Typed from "typed.js";
import Home from "./Components/Home";
import Post from "./Components/Post";
import Homepage from "./Components/Homepage";

export default function App() {
  const [isClicked, setClicked] = useState(false);
  function clickHandler() {
    setClicked(true);
  }
  const test = [];
  const [userVerified, setUserVerified] = useState(false);

  function userVerification(user) {}

  return (
    <div className="app">
      <Header />
      <Homepage />
      {/* <Register /> */}
      {/* {userVerified ? <Login checkUser={userVerification}/> : <Register />} */}
      <Login />
      {/* <Home /> */}
      {/* <Thoughts />
      <Meditate /> */}
      <Footer />
      {/* <h2 className="create" onClick={clickHandler}>
        {isClicked ? <Entry /> : "Create an Entry"}
      </h2> */}
      {/* {test.length === 1 ? <Register /> : <Login />} */}
    </div>
  );
}
