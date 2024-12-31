import React, { useState } from "react";

function Entry(props) {
  const getDate = new Date();
  const date = getDate.toLocaleDateString();

  const [isClicked, setIsClicked] = useState(false);
  const [entryInput, setEntryInput] = useState({
    entryTitle: "",
    entryContent: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEntryInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSubmit(event) {
    props.onAdd(entryInput);
    setEntryInput({ title: "", content: "" });
    event.preventDefault();
    setIsClicked(false);
  }

  function handleClick() {
    setIsClicked((prevState) => !prevState);
  }

  return (
    <>
      <div className="journalBtn">
        {!isClicked ? (
          <button className="journalBtn" onClick={handleClick}>
            Give Thanks{" "}
          </button>
        ) : (
          <form className="entryForm" onSubmit={handleSubmit}>
            <div className="container">
              <div className="entrySection">
                <h2 id="letItGo"> {props.title || "Give Thanks"}</h2>
                <input
                  id="entryTitle"
                  className="entryTitle "
                  type="text"
                  name="title"
                  placeholder="Enter a Title"
                  value={entryInput.title}
                  onChange={handleChange}
                />

                <textarea
                  id="entryContent"
                  className="entryContent"
                  name="content"
                  placeholder="What are you grateful for today?"
                  value={entryInput.content}
                  onChange={handleChange}
                  required
                />
                <div className="newEntryBtns">
                  <button className="entryBtn" type="submit">
                    {" "}
                    Submit{" "}
                  </button>
                  <button className="entryBtn" onClick={handleClick}>
                    {" "}
                    Cancel{" "}
                  </button>
                  <div id="dateBox">
                    <small id="date">{props.date}</small>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Entry;
