import React, { useState } from "react";
import "./newUser.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function NewUser() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a user object with form values
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password,
      isAdmin,
    };

    // Dispatch the addUser action with the newUser data
    addUser(newUser, dispatch);

    // Clear form input values
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  // Check if all fields are filled to enable the button
  const isButtonDisabled =
    !username || !email || !firstName || !lastName || !password;

  return (
    <div className="newUser">
      <Typography variant="h5" fontSize="28px" mb={4}>
        New User
      </Typography>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="20px"
          rowGap="30px"
          gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        >
          <TextField
            variant="outlined"
            type="text"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="text"
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="text"
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bigger-input"
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Switch />}
            label="Admin"
            labelPlacement="start"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className="newUserButton"
          disabled={isButtonDisabled}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
