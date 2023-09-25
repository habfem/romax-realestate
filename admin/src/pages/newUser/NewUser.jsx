import React, { useState } from "react";
import "./newUser.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";

export default function NewUser() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  //const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a timeline object with form values
    const newUser = {
      username,
      email,
      password,
    };

    // Dispatch the addTimeline action with the newTimeline data
    addUser(newUser, dispatch);

    // Clear form input values
    setUsername("");
    setEmail("");
    setPassword("");
  };


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
