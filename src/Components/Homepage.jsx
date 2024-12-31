import React, { useState } from "react";
import meditate from "../../public/assets/meditate.png";
import logo from "../../public/assets/logo.png";
import pray from "../../public/assets/pray.png";
import Login from "./Login";
import Register from "./Register";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Homepage() {
  const [clicked, setClicked] = useState(false);
  function clickHandler() {
    setClicked(true);
  }

  return (
    <div className="container1">
      <div className="main1">
        <div className="subtitle">
          <span>
            <h3 className="td subtitle">The Daily </h3>
          </span>
        </div>

        <div className="hp3">
          <div className="hp4">
            <span>
              <h2 className="ga">Gratitude App</h2>
              <br />
            </span>
          </div>
        </div>

        <div className="contentz">
          <div className="d1">
            <img className="b1" src={logo} />
          </div>
          <div className="d2">
            <img className="b1" src={meditate} />
          </div>
          <div className="d3">
            <img className="b1" src={pray} />
          </div>
        </div>
      </div>

      <div className="main2 container">
        <div className="mainLogin">
          <div
            className="log"
            onClick={clickHandler}
            style={clicked ? { background: "none", marginTop: "-20px" } : null}
          >
            {clicked ? <Login /> : "Log In"}
          </div>
        </div>
      </div>

      <div className="blues">
        <Row>
          <Col className="contained">
            <h3 className="slogan s1">GIVE THANKS</h3>
            <div className="dTextDiv">
              <p className="p1">
                Take time out of your busy day to express thanks in your own,
                personal, daily gratitude Journal.
              </p>
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row className="mbg"></Row>
        <Row className="mbg">
          <Col className="contained">
            <h3 className="slogan s1">MEDITTATE</h3>
            <div className="dTextDiv">
              <p className="p2">
                Reset your mind, body, and soul with a 2, 5, or 8 minute
                personal meditation session.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mbg"></Row>
        <Row></Row>
        <Col></Col>
        <Row>
          <data value=""></data>
          <Col className="contained">
            <h3 className="slogan s1">LET GO</h3>
            <div className="dTextDiv">
              <p className="p3">
                Reset your mind, body, and soul with a 2, 5, or 8 minute
                personal meditation session.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Container></Container>
    </div>
  );
}
export default Homepage;
