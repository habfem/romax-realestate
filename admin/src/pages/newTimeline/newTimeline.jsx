import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTimeline } from "../../redux/apiCalls";
import "./newTimeline.css";

export default function NewTimeline() {
  const dispatch = useDispatch();

  // Create state variables to manage form input values
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [dateText, setDateText] = useState("");
  const [color, setColor] = useState("#fff");
  const [background, setBackground] = useState("#76bb7f");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a timeline object with form values
    const newTimeline = {
      title,
      subtitle,
      paragraph,
      paragraph2,
      dateText,
      color,
      background,
    };

    // Dispatch the addTimeline action with the newTimeline data
    addTimeline(newTimeline, dispatch);

    // Clear form input values
    setTitle("");
    setSubtitle("");
    setParagraph("");
    setParagraph2("");
    setDateText("");
    setColor("#fff");
    setBackground("#76bb7f");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Timeline</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Sub-Title</label>
          <input
            type="text"
            placeholder="Sub-Title"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Paragraph</label>
          <input
            type="text"
            placeholder="Paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Paragraph 2</label>
          <input
            type="text"
            placeholder="Second Paragraph"
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Date Text</label>
          <input
            type="text"
            placeholder="01/2013 - 05/2017"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="#fff"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Background</label>
          <input
            type="text"
            placeholder="#76bb7f"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
