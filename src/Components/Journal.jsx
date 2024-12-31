import React, { useState } from "react";
import { Zoom } from "@mui/material";
import Entry from "./Entry";
import EntryButton from "./EntryButton";

function Journal(props) {
  const [showContent, setShowContent] = useState(false);

  function clickHandler(prevContent) {
    setShowContent((prevContent) => {
      return !prevContent;
    });
  }
  function viewClick() {
    props.getEntry(props.id);
  }
  function deleteClick() {
    props.deleteEntry(props.id);
  }
  function editClick() {
    props.editEntry(props.id);
  }

  return (
    <div className="journalDiv">
      <div className="journal">
        <div className="journalEntry" onClick={clickHandler}>
          <h2
            className="previewTitle"
            onChange={setShowContent}
            style={
              showContent
                ? {
                    textAlign: "left",
                  }
                : { textAlign: "center" }
            }
          >
            {" "}
            {props.title}
          </h2>
          {showContent && (
            <>
              <Zoom in={true}>
                <div className="previewContent" onChange={setShowContent}>
                  {" "}
                  {props.content.substr(0, 88)}...
                  <div className="icon-div">
                    <img
                      className="icon-view"
                      src={props.view}
                      alt="icon"
                      onClick={viewClick}
                    />
                    <img
                      className="icon-delete"
                      src={props.trashcan}
                      alt="icon"
                      onClick={deleteClick}
                    />
                    <img
                      className="icon-edit"
                      src={props.edit}
                      alt="icon"
                      onClick={editClick}
                    />
                  </div>
                </div>
              </Zoom>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journal;
