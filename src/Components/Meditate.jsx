import React, { useState, useEffect } from "react";
import meditate from "../../public/assets/meditate.png";
import Countdown from "react-countdown";

function Meditate() {
  const pulsate = {
    borderRadius: "50%",
    marginBottom: "50px",
    padding: "5px",
    animation: "pulse 10s ease infinite",
  };

  //MEDITATION-ICON ANIMATION:
  const [clicked, setClicked] = useState(null);
  let btnId = null;
  let focus = "";

  function clickHandler(event) {
    let btnId = event.target.getAttribute("id");
    // setClicked(pulsate);
    timer = Number(btnId) * 60000;
    setClicked(pulsate);
    setTimeout(() => {
      setClicked(null);
    }, timer);
    return timer;
  }

  //MEDITATION TEXT ANIMATION:
  const [meditationText, setMeditationText] = useState("Breathe In");
  useEffect(() => {
    let interval;
    if (clicked) {
      interval = setInterval(() => {
        setMeditationText((prevText) =>
          prevText === "Breathe In" ? "Breathe Out" : "Breathe In"
        );
      }, 5000);
    } else {
      setMeditationText("Breathe In");
    }
    return () => clearInterval(interval);
  }, [clicked]);

  //TIMER:
  let renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      return (
        <h3 id="countDown">
          {seconds === 0
            ? `${minutes} Min.`
            : seconds <= 9
            ? `${minutes}:0${seconds}`
            : `${minutes}:${seconds}`}
        </h3>
      );
    }
  };

  function animStyle() {
    const [animText, setAnimStyle] = useState("white");
  }

  return (
    <div className="meditationDiv">
      {clicked ? (
        <h2 id="activeMeditationText">{meditationText}</h2>
      ) : (
        <h2 id="meditationText">Meditation Session </h2>
      )}
      <div className="circ-animation">
        <img
          className="med-icon"
          src={meditate}
          onChange={clickHandler}
          style={clicked || {}}
          onClick={clickHandler}
        />
      </div>
      {clicked ? (
        <div className="countDownDiv">
          {" "}
          <Countdown date={Date.now() + timer} renderer={renderer} />{" "}
        </div>
      ) : (
        <>
          <h4 className="duration"> Select duration (minutes):</h4>
          <div className="meditate">
            <div className="medBox">
              <button onClick={clickHandler} className="med-btn" id="2">
                {" "}
                2
              </button>
              <button
                onClick={clickHandler}
                className="med-btn theme-bg"
                id="5"
              >
                {" "}
                5
              </button>
              <button
                onClick={clickHandler}
                className="med-btn theme-bg"
                id="8"
              >
                {" "}
                8
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Meditate;
