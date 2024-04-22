import { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Button,
  Paper,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { userRequest } from "../../requestMethods";

const Address = ({ _id, downPayment, years, interest, setDeleteFlag, deleteFlag }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
      elevation={0}
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
        flexDirection: isNonMobile ? "row" : "column",
        columnGap: 1.5,
        // justifyContent: "space-between"
      }}
    >
      <Typography variant="subtitle2" flex={"1 1 0"} whiteSpace="pre">
        {downPayment}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 0" whiteSpace="pre">
        {interest}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 0" whiteSpace="pre">
        {years}
      </Typography>
    
      {/* <Typography variant="subtitle2" flex="1 1 0">
        { ` ${state} State`}
      </Typography> */}
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
    </Paper>
  );
};

const Mortgages = ({ openDrawer }) => {
  const [addresses, setAddresses] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false)

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
  return (
    <Stack spacing={2}>
      <Header
        Icon={HouseSidingIcon}
        title={"My Mortgage"}
        openDrawer={openDrawer}
        button="Add New Mortgage"
        link={`/user/mortgages/new`}
      />

      { addresses.length === 0 ? <Box>
         <Typography variant="h5" textAlign="center" mt={5}>No Mortgage Found</Typography>
      </Box> : <Stack spacing={2}>
        {addresses?.map((address, index) => (
          <Address {...address} setDeleteFlag={setDeleteFlag} deleteFlag={deleteFlag} key={index} />
        ))}
      </Stack>}
    </Stack>
  );
};

export default Mortgages;
