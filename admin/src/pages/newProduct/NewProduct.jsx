import "./newProduct.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";

import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  MenuItem,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import { Clear, Close, Add } from "@material-ui/icons";
import {
  createProducts,
  resetState,
  getProduct,
  updateProduct,
} from "../../redux/productRedux";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../toaster";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

export default function NewProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [touch, setTouched] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");
  const productState = useSelector((state) => state.product);

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productData,
  } = productState;

  const resetFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "create") {
      dispatch(getProduct(id));
    } else {
      dispatch(resetState());
    }

    return () => {
      dispatch(resetState());
      setSelectedFiles([]);
    };
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      makeToast("success", "Product Added Sucessfully!");
      resetFormRef.current();
      setSelectedFiles([]);
      dispatch(resetState());
    }
    if (isSuccess && updatedProduct) {
      makeToast("success", "Product Updated Successfullly!");
      setSelectedFiles([]);

      navigate("/products");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const initialValues = {
    title: productData?.title || "",
    desc: productData?.desc || "",
    sataliteView: productData?.sataliteView || "",
    streetView: productData?.streetView || "",
    size: productData?.size || "",
    propertyType: productData?.propertyType || "",
    price: productData?.price || "",
    location: productData?.location || "",
    address: productData?.address || "",
    car: productData?.car || "",
    bed: productData?.bed || "",
    bath: productData?.bath || "",
    category: productData?.category || "",
    broadband: productData?.broadband || "",
    parlourDesc: productData?.parlourDesc || "",
    parlourDimension: productData?.parlourDimension || "",
    kitchenDesc: productData?.kitchenDesc || "",
    kitchenDimension: productData?.kitchenDimension || "",
    energyEfficiency: productData?.energyEfficiency || "",
    OutsideSpace: productData?.OutsideSpace || [],
    otherSpace: productData?.otherSpace || [],
    rooms: productData?.rooms || [],
    images: [],
    features: productData?.features || [],
    isFeatured: productData?.isFeatured || false,
    inStock: productData?.inStock || "",
  };
  useEffect(() => {
    if (productData) {
      setSelectedFiles(productData?.img);
    }
  }, [productData]);
  return (
    <div className="addProduct">
      <Typography variant="h5" fontSize={{ xs: "19px", sm: "28px" }} mb={4}>
        {id === "create" ? "Add New Product" : "Edit Product"}
      </Typography>{" "}
      <Formik
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          console.log(values.features);

          if (id !== "create") {
            const data = {
              id: id,
              productData: { ...values, previousImages: selectedFiles },
            };

            dispatch(updateProduct(data));
            resetFormRef.current = resetForm;
          } else {
            dispatch(createProducts(values));
            resetFormRef.current = resetForm;
          }
          // dispatch(createProducts(values));

          // resetFormRef.current = resetForm;
        }}
        initialValues={initialValues}
        validationSchema={productSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              rowGap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <Box
                sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="text"
                  label="Property Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.propertyType}
                  name="propertyType"
                  error={!!touched.propertyType && !!errors.propertyType}
                  helperText={touched.propertyType && errors.propertyType}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="text"
                  label="Property Size"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.size}
                  name="size"
                  error={!!touched.size && !!errors.size}
                  helperText={touched.size && errors.size}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="number"
                  label="Bathroom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bath}
                  name="bath"
                  error={!!touched.bath && !!errors.bath}
                  helperText={touched.bath && errors.bath}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />{" "}
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="number"
                  label="Bedroom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bed}
                  name="bed"
                  error={!!touched.bed && !!errors.bed}
                  helperText={touched.bed && errors.bed}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="number"
                  label="Parking"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.car}
                  name="car"
                  error={!!touched.car && !!errors.car}
                  helperText={touched.car && errors.car}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="text"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  // fullWidth
                  variant="outlined"
                  type="number"
                  label="Price(N)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={!!touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{
                    width: isNonMobile ? "480px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />{" "}
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Stock"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.inStock}
                  name="inStock"
                  error={!!touched.inStock && !!errors.inStock}
                  helperText={touched.inStock && errors.inStock}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Parlour Dimension"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.parlourDimension}
                  name="parlourDimension"
                  error={!!touched.parlourDimension && !!errors.parlourDimension}
                  helperText={touched.parlourDimension && errors.parlourDimension}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Parlour Desc"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.parlourDesc}
                  name="parlourDesc"
                  error={!!touched.parlourDesc && !!errors.parlourDesc}
                  helperText={touched.parlourDesc && errors.parlourDesc}
                  sx={{
                    width: isNonMobile ? "480px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />{" "}
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Broadband"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.broadband}
                  name="broadband"
                  error={!!touched.broadband && !!errors.broadband}
                  helperText={touched.broadband && errors.broadband}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
              </Box>
              <Box
              sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}>
              <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Kitchen Dimension"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.kitchenDimension}
                  name="kitchenDimension"
                  error={!!touched.kitchenDimension && !!errors.kitchenDimension}
                  helperText={touched.kitchenDimension && errors.kitchenDimension}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Kitchen Desc"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.kitchenDesc}
                  name="kitchenDesc"
                  error={!!touched.kitchenDesc && !!errors.kitchenDesc}
                  helperText={touched.kitchenDesc && errors.kitchenDesc}
                  sx={{
                    width: isNonMobile ? "480px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />{" "}
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Energy Efficiency"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.energyEfficiency}
                  name="energyEfficiency"
                  error={!!touched.energyEfficiency && !!errors.energyEfficiency}
                  helperText={touched.energyEfficiency && errors.energyEfficiency}
                  sx={{
                    width: isNonMobile ? "230px" : "100%",
                  }}
                  InputLabelProps={{
                    style: { fontSize: "15px" },
                  }}
                />
              </Box>
              <Box
                sx={{
                  gridColumn: "span 4",
                }}
              >
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const files = acceptedFiles.map((file) => {
                        const url = URL.createObjectURL(file);
                        return url;
                      });
                      setSelectedFiles((prevFiles) => [...files, ...prevFiles]);
                      setFieldValue("images", [
                        ...acceptedFiles,
                        ...values.images,
                      ]);
                    }}
                    // accept="image/*"
                    multiple={true} // Set multiple to true to allow multiple file uploads
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          backgroundColor: "#F6F9FC",
                          width: "100%",
                          mt: 2,
                          border: `1px dashed ${
                            errors.images && touch ? "#f44336" : "#DAE1E7"
                          }`,
                          display: "flex",
                          justifyContent: "center",
                          gap: "20px",
                          alignItems: "center",
                          flexDirection: "column",
                          minHeight: "200px",
                          py: 4,
                          borderRadius: "8px",
                        }}
                        onBlur={() => setTouched(true)}
                      >
                        <input accept="image/*" {...getInputProps()} />
                        <Typography
                          variant="body2"
                          color={errors.images && touch ? "#f44336" : "#7D879C"}
                        >
                          {errors.images && touch
                            ? errors.images
                            : "Drag and drop images here"}{" "}
                        </Typography>
                        <Box width="300px">
                          <Divider
                            sx={{
                              color: "#DAE1E7",
                            }}
                          >
                            OR
                          </Divider>
                        </Box>

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
                    )}
                  </Dropzone>
                  {selectedFiles.length > 0 && (
                    <div
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          style={{
                            display: "inline-block",
                            position: "relative",
                            marginRight: "10px",
                          }}
                        >
                          <Clear
                            sx={{
                              position: "absolute",
                              fontSize: "14px",
                              top: "-10px",
                              right: "-7px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setSelectedFiles((prevFiles) => {
                                const updatedFiles = prevFiles.filter(
                                  (_, i) => i !== index
                                );
                                return updatedFiles;
                              });
                              const updatedImages = values.images.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("images", updatedImages);
                            }}
                          />
                          <img
                            src={file}
                            alt="Selected"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Box>
              <CustomTextField
                fullWidth
                variant="outlined"
                type="text"
                label="Description"
                multiline
                rows={6}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{
                  gridColumn: "span 4",
                }}
                InputLabelProps={{
                  style: { fontSize: "15px" },
                }}
              />
              <CustomTextField
                fullWidth
                variant="outlined"
                type="text"
                label="Satelite View"
                multiline
                rows={6}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sataliteView}
                name="sataliteView"
                error={!!touched.sataliteView && !!errors.sataliteView}
                helperText={touched.sataliteView && errors.sataliteView}
                sx={{
                  gridColumn: "span 4",
                }}
                InputLabelProps={{
                  style: { fontSize: "15px" },
                }}
              />
              <CustomTextField
                fullWidth
                variant="outlined"
                type="text"
                label="Street View"
                multiline
                rows={6}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.streetView}
                name="streetView"
                error={!!touched.streetView && !!errors.streetView}
                helperText={touched.streetView && errors.streetView}
                sx={{
                  gridColumn: "span 4",
                }}
                InputLabelProps={{
                  style: { fontSize: "15px" },
                }}
              />
              <FieldArray name="features">
                {({ push, remove }) => (
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      padding: "25px 20px",
                      borderRadius: "10px",
                      border: "1px solid #DAE1E7",
                    }}
                  >
                    <Typography variant="h5" textAlign="center">
                      Add Property Features
                    </Typography>
                    {values.features.map((feature, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                        }}
                      >
                        <CustomTextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label={`Feature ${index + 1}`}
                          name={`features[${index}]`}
                          value={feature}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.features && !!errors.features}
                          helperText={touched.features && errors.features}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            right: "-11px",
                            top: "-14px",
                          }}
                          onClick={() => remove(index)}
                        >
                          <Close
                            style={{
                              fontSize: "15px",
                            }}
                          />
                        </IconButton>
                      </Box>
                    ))}

                    <Button
                      type="button"
                      sx={{
                        textTransform: "none",
                        bgcolor: "#4e97fd",
                        color: "white",
                        fontSize: "14px",
                        paddingX: "15px",
                        fontWeight: 400,
                        paddingY: "5px",
                        alignSelf: values.features.length > 0 ? "end" : "start",
                        borderRadius: "8px",
                        margin: values.features.length > 0 ? "0 0" : "0 auto",

                        "&:hover": {
                          backgroundColor: "#2756b6",
                        },
                      }}
                      onClick={() => push("")}
                    >
                      Add Feature
                    </Button>
                  </Box>
                )}
              </FieldArray>

              <FieldArray name="rooms">
                {({ push, remove }) => (
                <Box
                  sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "25px 20px",
                  borderRadius: "10px",
                  border: "1px solid #DAE1E7",
                  }}
                  >
      <Typography variant="h5" textAlign="center">
        Add Rooms
      </Typography>
      {values.rooms.map((room, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
          }}
        >
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Room ${index + 1} Title`}
            name={`rooms[${index}].title`}
            value={room.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rooms && touched.rooms[index] && !!errors.rooms?.[index]?.title}
            helperText={touched.rooms && touched.rooms[index] && errors.rooms?.[index]?.title}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Room ${index + 1} Description`}
            name={`rooms[${index}].description`}
            value={room.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rooms && touched.rooms[index] && !!errors.rooms?.[index]?.description}
            helperText={touched.rooms && touched.rooms[index] && errors.rooms?.[index]?.description}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Room ${index + 1} Dimensions`}
            name={`rooms[${index}].dimensions`}
            value={room.dimensions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rooms && touched.rooms[index] && !!errors.rooms?.[index]?.dimensions}
            helperText={touched.rooms && touched.rooms[index] && errors.rooms?.[index]?.dimensions}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: "-11px",
              top: "-14px",
            }}
            onClick={() => remove(index)}
          >
            <Close
              style={{
                fontSize: "15px",
              }}
            />
          </IconButton>
        </Box>
      ))}

      <Button
        type="button"
        sx={{
          textTransform: "none",
          bgcolor: "#4e97fd",
          color: "white",
          fontSize: "14px",
          paddingX: "15px",
          fontWeight: 400,
          paddingY: "5px",
          alignSelf: values.rooms.length > 0 ? "end" : "start",
          borderRadius: "8px",
          margin: values.rooms.length > 0 ? "0 0" : "0 auto",
          "&:hover": {
            backgroundColor: "#2756b6",
          },
        }}
        onClick={() => push({ title: "", description: "", dimensions: "" })}
      >
        Add Room
      </Button>
    </Box>
  )}
              </FieldArray>

              <FieldArray name="otherSpace">
  {({ push, remove }) => (
    <Box
      sx={{
        gridColumn: "span 4",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "25px 20px",
        borderRadius: "10px",
        border: "1px solid #DAE1E7",
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add Other Spaces
      </Typography>
      {values.otherSpace.map((otherSpac, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
          }}
        >
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Other Space ${index + 1} Title`}
            name={`otherSpace[${index}].title`}
            value={otherSpac.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.otherSpace && touched.otherSpace[index] && !!errors.otherSpace?.[index]?.title}
            helperText={touched.otherSpace && touched.otherSpace[index] && errors.otherSpace?.[index]?.title}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Other Space ${index + 1} Description`}
            name={`otherSpace[${index}].description`}
            value={otherSpac.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.otherSpace && touched.otherSpace[index] && !!errors.otherSpace?.[index]?.description}
            helperText={touched.otherSpace && touched.otherSpace[index] && errors.otherSpace?.[index]?.description}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Other Space ${index + 1} Dimensions`}
            name={`otherSpace[${index}].dimensions`}
            value={otherSpac.dimensions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.otherSpace && touched.otherSpace[index] && !!errors.otherSpace?.[index]?.dimensions}
            helperText={touched.otherSpace && touched.otherSpace[index] && errors.otherSpace?.[index]?.dimensions}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: "-11px",
              top: "-14px",
            }}
            onClick={() => remove(index)}
          >
            <Close
              style={{
                fontSize: "15px",
              }}
            />
          </IconButton>
        </Box>
      ))}

<Button
        type="button"
        sx={{
          textTransform: "none",
          bgcolor: "#4e97fd",
          color: "white",
          fontSize: "14px",
          paddingX: "15px",
          fontWeight: 400,
          paddingY: "5px",
          alignSelf: values.otherSpace.length > 0 ? "end" : "start",
          borderRadius: "8px",
          margin: values.otherSpace.length > 0 ? "0 0" : "0 auto",
          "&:hover": {
            backgroundColor: "#2756b6",
          },
        }}
        onClick={() => push({ title: "", description: "", dimensions: "" })}
      >
        Add Other Space
      </Button>
    </Box>
  )}
</FieldArray>

<FieldArray name="OutsideSpace">
  {({ push, remove }) => (
    <Box
      sx={{
        gridColumn: "span 4",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "25px 20px",
        borderRadius: "10px",
        border: "1px solid #DAE1E7",
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add Outside Spaces
      </Typography>
      {values.OutsideSpace.map((OutsideSpac, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
          }}
        >
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Outside Space ${index + 1} Title`}
            name={`OutsideSpace[${index}].title`}
            value={OutsideSpac.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.OutsideSpace && touched.OutsideSpace[index] && !!errors.OutsideSpace?.[index]?.title}
            helperText={touched.OutsideSpace && touched.OutsideSpace[index] && errors.OutsideSpace?.[index]?.title}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Outside Space ${index + 1} Description`}
            name={`OutsideSpace[${index}].description`}
            value={OutsideSpac.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.OutsideSpace && touched.OutsideSpace[index] && !!errors.OutsideSpace?.[index]?.description}
            helperText={touched.OutsideSpace && touched.OutsideSpace[index] && errors.OutsideSpace?.[index]?.description}
          />
          <br /> <br />
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label={`Outside Space ${index + 1} Dimensions`}
            name={`OutsideSpace[${index}].dimensions`}
            value={OutsideSpac.dimensions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.OutsideSpace && touched.OutsideSpace[index] && !!errors.OutsideSpace?.[index]?.dimensions}
            helperText={touched.OutsideSpace && touched.OutsideSpace[index] && errors.OutsideSpace?.[index]?.dimensions}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: "-11px",
              top: "-14px",
            }}
            onClick={() => remove(index)}
          >
            <Close
              style={{
                fontSize: "15px",
              }}
            />
          </IconButton>
        </Box>
      ))}

      <Button
        type="button"
        sx={{
          textTransform: "none",
          bgcolor: "#4e97fd",
          color: "white",
          fontSize: "14px",
          paddingX: "15px",
          fontWeight: 400,
          paddingY: "5px",
          alignSelf: values.otherSpace.length > 0 ? "end" : "start",
          borderRadius: "8px",
          margin: values.otherSpace.length > 0 ? "0 0" : "0 auto",
          "&:hover": {
            backgroundColor: "#2756b6",
          },
        }}
        onClick={() => push({ title: "", description: "", dimensions: "" })}
      >
        Add Outside Space
      </Button>
    </Box>
  )}
</FieldArray>

              <Box
                mt="20px"
                sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  flexDirection: Mobile ? "row" : "column",
                  gap: Mobile ? 4 : 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isFeatured}
                      onChange={(e) => {
                        setFieldValue("isFeatured", e.target.checked);
                      }}
                      name="isFeatured"
                      sx={{
                        "& .MuiSwitch-thumb": {
                          color: "#2756b6",
                        },
                        "& .Mui-checked+.MuiSwitch-track": {
                          backgroundColor: "#4e97fd !important",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography component="span" sx={{ fontSize: "17px" }}>
                      isFeatured
                    </Typography>
                  }
                />

                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={values.inStock}
                      onChange={(e) => {
                        setFieldValue("inStock", e.target.checked);
                      }}
                      name="inStock"
                      sx={{
                        "& .MuiSwitch-thumb": {
                          color: "#2756b6",
                        },
                        "& .Mui-checked+.MuiSwitch-track": {
                          backgroundColor: "#4e97fd !important",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography component="span" sx={{ fontSize: "17px" }}>
                      Property is Available
                    </Typography>
                  }
                /> */}
              </Box>
            </Box>

            <Button
              type="submit"
              disabled={!isValid || (!dirty && id === "create") || isLoading}
              // disabled={!isValid || (!dirty || !productData)}

              sx={{
                textTransform: "none",
                bgcolor:
                  !isValid || (!dirty && id === "create")
                    ? "#0000001f"
                    : "#4e97fd",
                color: "white",
                fontSize: "14px",
                paddingX: "15px",
                fontWeight: 400,
                paddingY: "5px",
                alignSelf: "start",
                borderRadius: "8px",
                alignItems: "center",
                mt: "20px",
                "&:hover": {
                  backgroundColor: "#2756b6",
                },
              }}
            >
              Save Product
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

const productSchema = yup.object().shape({
  title: yup.string().required("required"),
  propertyType: yup.string().required("required"),
  size: yup.string().required("required"),
  location: yup
    .string()
    .required("required")
    .min(5, "Name must be at least 5 characters"),
  desc: yup
    .string()
    .required("required")
    .min(8, "Name must be at least 8 characters"),
  bath: yup.number().required("required"),
  bed: yup.number().required("required"),
  car: yup.number().required("required"),
  price: yup.number().required("required"),
  broadband: yup.string().required("required"),
});
