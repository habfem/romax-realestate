import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import makeToast from "../../toaster";
import "./newEstate.css";
import { addEstate } from "../../redux/apiCalls";

const CustomTextField = (props) => (
  <TextField fullWidth variant="outlined" {...props} />
);

export default function NewEstate() {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [features, setFeatures] = useState("");
  const [house, setHouse] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEstate = {
      title,
      desc,
      categories,
      location,
      features,
      house,
      img,
    };

    addEstate(newEstate, dispatch);
    makeToast("success", "Estate Added successfully");
    setTitle("");
    setDesc("");
    setCategories("");
    setLocation("");
    setFeatures("");
    setHouse("");
    setImg("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedImg = acceptedFiles[0];
      setImg(selectedImg);
    },
    accept: "image/*",
    multiple: true,
  });

  const isFormEmpty = () => {
    return (
      !title.trim() ||
      !desc.trim() ||
      !categories.trim() ||
      !location.trim() ||
      !features.trim() ||
      !house.trim() ||
      !img
    );
  };

  return (
    <Box px={{ xs: 2, md: 4 }} style={{ width: "80%", height: "100vh" }}>
      <Typography variant="h5" fontSize={{ xs: "19px", sm: "28px" }} mb={4}>
        New Estate
      </Typography>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type="text"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type="text"
              label="Categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type="text"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              type="number"
              label="No of Houses"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              {...getRootProps()}
              style={{
                backgroundColor: "#F6F9FC",
                width: "100%",
                marginTop: "20px",
                border: `1px dashed ${"#DAE1E7"}`,
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "200px",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <input accept="image/*" {...getInputProps()} />
              <Typography
                variant="body2"
                color={"#7D879C"}
                style={{
                  color: img ? "#7D879C" : "#f44336",
                }}
              >
                {img ? "File selected: " + img.name : "Drag and drop an image here"}
              </Typography>
              <Divider
                sx={{
                  color: "#DAE1E7",
                  width: "100%",
                }}
              >
                OR
              </Divider>
              <Button
                variant="outlined"
                sx={{
                  color: "#4E97FD",
                  borderColor: "#4e97fd80",
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  paddingX: "30px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(78, 151, 253, 0.04)",
                    border: "1px solid #4E97FD",
                  },
                }}
                component="span"
              >
                Select File
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              type="text"
              label="Features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              type="text"
              label="Description"
              multiline
              rows={6}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="newUserButton"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isFormEmpty()} // Disable button if form is empty
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
