import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Button,
  Paper,
  Box,
  IconButton,
  useMediaQuery,
  Switch,
  Snackbar,
  SnackbarContent,
  Alert
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { userRequest } from "../../requestMethods";

const Address = ({ _id, downPayment, years, interest, active, setDeleteFlag, deleteFlag, handleSetActive }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const handleDeleteAddress = async () => {
    try {
      await userRequest.delete(`/mortgage/${_id}`);
      setDeleteFlag(!deleteFlag)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        bgcolor: "white",
        borderRadius: "10px",
        alignItems: "center",
        textTransform: "capitalize",
        gap: 1,
        flexWrap: "wrap",
        flexDirection: "column",
        columnGap: 1.5,
        width: "calc(100% / 3)",
        minWidth: "200px", 
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="subtitle2" flex={"1 1 0"} whiteSpace="pre">
          Down Payment: <strong>{numberWithCommas(addDecimals(downPayment))}</strong>
        </Typography>

        <Typography variant="subtitle2" flex="1 1 0" whiteSpace="pre">
          Interest Rate: <strong>{interest}%</strong>
        </Typography>

        <Typography variant="subtitle2" flex="1 1 0" whiteSpace="pre">
          Term (years): <strong>{years}</strong>
        </Typography>
        
        <Switch 
          checked={active} 
          onChange={() => handleSetActive(_id, !active)} // Toggle active state
        />
      
        <Stack direction="row" justifyContent="end">
          <Link
            to={`/user/mortgages/${_id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={handleDeleteAddress}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

const Mortgages = ({ openDrawer }) => {
  const [addresses, setAddresses] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await userRequest.get("/mortgage");
        setAddresses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddresses();
  }, [deleteFlag]);

  const handleSetActive = async (id, active) => {
    try {
      if (active && addresses.some(address => address.active && address._id !== id)) {
        setSnackbarOpen(true); // Display snackbar if there's already an active mortgage
      } else {
        await userRequest.put(`/mortgage/${id}`, { active });
        const updatedAddresses = addresses.map(address => ({
          ...address,
          active: address._id === id ? active : address.active
        }));
        setAddresses(updatedAddresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={2}>
      <Header
        Icon={HouseSidingIcon}
        title={"My Mortgage"}
        openDrawer={openDrawer}
        button="Add New Mortgage"
        link={`/user/mortgages/new`}
      />

      { addresses.length === 0 ? (
        <Box>
          <Typography variant="h5" textAlign="center" mt={5}>No Mortgage Found</Typography>
        </Box>
      ) : (
        <Stack spacing={2} direction="row" flexWrap="wrap">
          {addresses.map(address => (
            <Address 
              key={address._id} 
              {...address} 
              setDeleteFlag={setDeleteFlag} 
              deleteFlag={deleteFlag} 
              handleSetActive={handleSetActive} 
            />
          ))}
        </Stack>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          You can only have one mortgage active at a time.
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Mortgages;
