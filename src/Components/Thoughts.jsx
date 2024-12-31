import React, { useState, useEffect } from "react";

function Thoughts(props) {
  const [content, setContent] = useState("");
  const [isText, setText] = useState(false);

  function handleChange(event) {
    let value = event.target.value;
    return setContent(value);
  }

  function clickHandler(event) {
    event.preventDefault();
    const letGoText = document.getElementById("entryContent");
    const letGoBtn = document.getElementById("letGoBtn");
    letGoText.style.display = "none";
    letGoBtn.style.display = "none";
    setTimeout(() => {
      setContent("");
    }, 5000);
    setText(true);
    setTimeout(() => {
      letGoText.style.display = "";
      letGoBtn.style.display = "";
    }, 6000);
    return letGoText;
  }

  return (
    <>
      <form className="entryForm" action="/submit">
        <div className="container">
          <div className="entrySection form-group">
            <h2 id="letItGo"> Let it Go</h2>
            <p className="letGoInfo">
              {" "}
              A safe space to let go of the thoughts currently weighing down
              your mind.
            </p>
            <h3
              id={clickHandler ? "letGoText" : {}}
              onChange={handleChange}
              style={
                isText
                  ? { color: "red", margin: "25px" }
                  : { color: "darkcyan" }
              }
            >
              {" "}
              {content}
            </h3>

            <textarea
              id="entryContent"
              className="entryContent"
              name="content"
              placeholder="What do you need to let go of? Write it Here!"
              style={{ height: "100px", marginTop: "20px" }}
              onChange={handleChange}
              value={content}
              required
            />

            <div className="formDiv">
              <button id="letGoBtn" className="entryBtn" onClick={clickHandler}>
                Let Go
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default Thoughts;
