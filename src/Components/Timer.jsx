import React from "react";

function Timer() {
  return;
  <>
    <h3 id="countDown">
      {seconds === 0
        ? `${minutes} Min.`
        : seconds <= 9
        ? `${minutes}:0${seconds}`
        : `${minutes}:${seconds}`}
    </h3>
  </>;
}
export default Timer;
