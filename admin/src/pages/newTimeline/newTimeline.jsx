import { useState } from "react";
import "./newTimeline.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom"
import app from "../../firebase";
import { addTimeline } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import makeToast from "../../toaster";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function NewTimeline() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error)
        makeToast("error", "Something went wrong!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const timeline = { ...inputs, img: downloadURL };
          addTimeline(timeline, dispatch);
          navigate("/timelines")
          makeToast("success", "Timeline Added Sucessfully!");
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          paddingTop: "2rem",
        }}
      >
        <Typography variant="h6" className="addProductTitle">
          New Timeline
        </Typography>
        <form className="addProductForm">
          <TextField
            fullWidth
            type="file"
            label=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="title"
            label="Title"
            placeholder="Romax"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="subtitle"
            label="Sub-Title"
            placeholder="Sub-Title"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="paragraph"
            label="Paragraph"
            placeholder="Paragraph"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="paragraph2"
            label="Paragraph-2"
            placeholder="Paragraph-2"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="dateText"
            label="Date Text"
            placeholder="Date Text"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="color"
            label="Color"
            placeholder="#fff"
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            fullWidth
            type="text"
            name="background"
            label="Background"
            placeholder="#76bb7f"
            onChange={handleChange}
          />
          <br />
          <br />
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            className="addProductButton"
          >
            Create
          </Button>
        </form>
      </Box>
    </div>
  );
}
