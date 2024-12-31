import React, { useState } from "react";
import Entry from "./Entry";

function EntryButton(props) {
  const getDate = new Date();
  const date = getDate.toLocaleDateString();
  const [isClicked, setClicked] = useState(false);
  function clickHandler() {
    setClicked((prevState) => {
      return !prevState;
    });
  }

  //Initial State of Entry.
  const [entryInput, setEntryInput] = useState({
    title: "",
    content: "",
  });

  function onSubmit(entryInput) {
    event.preventDefault();
    console.log(setEntryInput.toString);
  }

  function handleSubmit(event) {
    const [name, value] = event.target;
    console.log(name);
    console.log(value);
    entryInput({
      entryTitle: title,
      entryContent: content,
    });
    event.preventDefault();
  }

  return (
    <div className="journalBtn">
      {isClicked ? (
        <>
          <Entry
            date={date}
            cancel={clickHandler}
            onChange={handleSubmit}
            submit={onSubmit}
          />
        </>
      ) : (
        <button className="journalBtn" onClick={clickHandler}>
          Give Thanks{" "}
        </button>
      )}
    </div>
  );
}

export default EntryButton;
