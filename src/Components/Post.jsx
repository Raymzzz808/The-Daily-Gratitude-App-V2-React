import React, { useState } from "react";

function Post(props) {
  const getDate = new Date();
  const date = getDate.toLocaleDateString();
  const [entry, setEntry] = useState({
    entryTitle: props.title,
    entryContent: props.content,
  });

  const [isEdited, setIsEdited] = useState(false);

  function handleEditToggle() {
    setIsEdited((prevState) => {
      return !prevState;
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEntry((prevEntry) => ({ ...prevEntry, [name]: value }));
  }

  function handleSave(event) {
    event.preventDefault();
    props.onSave({ ...entry, id: props.id, postDate: props.date });
    setIsEdited(false);
  }

  return (
    <form className="entryForm">
      <div className="container">
        <div className="entrySection">
          <h2 id="letItGo">
            {" "}
            {!isEdited ? entry.entryTitle || "Untitled" : ""}
          </h2>
          <input
            className="entryTitle "
            type="text"
            name="title"
            placeholder="Enter a Title"
            defaultValue={entry.entryTitle}
            onChange={handleChange}
            disabled={!isEdited} //Enable/Disable Edit Mode
          />
          <textarea
            className="entryContent"
            type="text"
            name="content"
            placeholder="What are you grateful for today?"
            defaultValue={entry.entryContent}
            onChange={handleChange}
            disabled={!isEdited} //Enable/Disable Edit Mode
          />
          <div className="newEntryBtns">
            {isEdited ? (
              <button
                id="saveBtn"
                className="entryBtn"
                type="button"
                onClick={handleSave} //Save!
              >
                Save
              </button>
            ) : (
              <button
                id="editBtn"
                className="entryBtn"
                type="button"
                onClick={handleEditToggle} //To Edit!
              >
                Edit
              </button>
            )}

            {isEdited ? (
              <button
                className="entryBtn"
                onClick={(event) => {
                  event.preventDefault();
                  setIsEdited(false);
                }}
              >
                {" "}
                Cancel{" "}
              </button>
            ) : (
              <button className="entryBtn" onClick={props.onClose}>
                {" "}
                Close{" "}
              </button>
            )}

            <div id="dateBox">
              <small id="date">{`Created: ${props.date}`}</small>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Post;
