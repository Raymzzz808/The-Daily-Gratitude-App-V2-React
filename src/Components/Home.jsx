import React, { useState } from "react";
import Journal from "./Journal";
import Entry from "./Entry";
import Post from "./Post";
import trashcan from "../../public/assets/trashcan.png";
import edit from "../../public/assets/edit.png";
import view from "../../public/assets/view.png";

function Home() {
  // GET from Back End Code!
  let userName = {
    firstName: "John",
    lastName: "Doe",
    email: "EmailTest",
  };
  const initialEntries = [
    {
      id: 1,
      title: "Just a Test",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      postDate: "12/01/24",
    },
    {
      id: 2,
      title: "test2",
      content: "Test Content2",
      postDate: "12/02/24",
    },
    {
      id: 3,
      title: "test3",
      content: "Test Content3",
      postDate: "12/03/24",
    },
  ];
  const [posted, setPosted] = useState(null);
  const [entries, setEntries] = useState(initialEntries);

  function entryHandler(id) {
    let post = entries[id];
    setPosted(post);
    return post;
  }

  function handleSave(updatedEntry) {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry
      )
    );
    setPosted(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    setPosted((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function addEntry(entryInput) {
    setEntries((prevEntries) => [
      ...prevEntries,
      { ...entryInput, id: prevEntries.length + 1 },
    ]);
    //TO DO: ADD DB CODE LATER! *****
  }

  function entryDelete(id) {
    setEntries((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="home">
      <h2 className="homeUser">
        {userName.firstName} {userName.lastName}
      </h2>
      <img className="userImg" src="" />
      <p className="postListTitle bottom"> </p>

      {posted ? (
        <Post
          id={posted.id}
          title={posted.title}
          content={posted.content}
          style={posted && { textAlign: "left", marginLeft: "15px" }}
          date={posted.postDate}
          onSave={handleSave}
          onClose={(event) => {
            event.preventDefault();
            setPosted(false);
          }}
        />
      ) : (
        <>
          <Entry onAdd={addEntry} />
        </>
      )}

      <p className="postListTitle bottom"></p>
      <div className="journalBox">
        {entries.map((post, index) => (
          <Journal
            key={index}
            id={index}
            title={post.title}
            content={post.content}
            //Entry Functions:
            getEntry={entryHandler}
            deleteEntry={entryDelete}
            editEntry={entryHandler}
            date={entryHandler}
            //Icons:
            view={view}
            trashcan={trashcan}
            edit={edit}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
