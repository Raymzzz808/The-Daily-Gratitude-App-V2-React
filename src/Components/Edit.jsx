import React, { useState } from "react";

function Post(props) {
  // Initialize state with props
  const [entry, setEntry] = useState({
    entryTitle: props.title || "",
    entryContent: props.content || "",
  });

  const [isEdited, setIsEdited] = useState(false); // Track edit mode

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEdited(true); // Enable editing when "Edit" is clicked
  };

  // Update state on input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  // Save edited data
  const handleSave = (event) => {
    event.preventDefault();
    props.onSave({
      ...entry,
      id: props.id,
      postDate: props.date,
    });
    setIsEdited(false); // Exit edit mode after saving
  };

  // Render form
  return (
    <form className="entryForm" onSubmit={(e) => e.preventDefault()}>
      <div className="container">
        <div className="entrySection">
          <h2 id="letItGo" style={props.style}>
            {entry.entryTitle || "Untitled"}
          </h2>
          {/* Title input */}
          <input
            className="entryTitle"
            type="text"
            name="entryTitle"
            placeholder="Enter a Title"
            value={entry.entryTitle}
            onChange={handleChange}
            disabled={!isEdited} // Disabled unless in edit mode
          />
          {/* Content textarea */}
          <textarea
            className="entryContent"
            name="entryContent"
            placeholder="What are you grateful for today?"
            value={entry.entryContent}
            onChange={handleChange}
            disabled={!isEdited} // Disabled unless in edit mode
          />
          {/* Buttons */}
          <div className="newEntryBtns">
            {isEdited ? (
              <>
                <button
                  id="saveBtn"
                  className="entryBtn"
                  type="button"
                  onClick={handleSave} // Save changes
                >
                  Save
                </button>
                <button
                  className="entryBtn"
                  type="button"
                  onClick={() => setIsEdited(false)} // Cancel editing
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  id="editBtn"
                  className="entryBtn"
                  type="button"
                  onClick={handleEditToggle} // Enable editing
                >
                  Edit
                </button>
                <button
                  className="entryBtn"
                  type="button"
                  onClick={props.onClose} // Close form
                >
                  Close
                </button>
              </>
            )}
          </div>
          <div id="dateBox">
            <small id="date">{`Created: ${props.date}`}</small>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Post;
