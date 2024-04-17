import "../userList/userList.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { Box,Typography } from "@mui/material";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await userRequest.get("/booking/products");
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, []);
  const bookingFiltered = bookings.map((booking) => ({
    id: booking?._id,
    bookingId: booking?.bookingId.substring(0, 8),
    viewDate: booking?.viewDate
      ? new Date(booking?.viewDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Pending",
    bookDate: new Date(booking?.bookDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    propertyTitle: booking?.product?.item?.title,
  }));

  const columns = [
    { field: "bookingId", headerName: "BookingId", width: 150 },

    {
      field: "bookDate",
      headerName: "Book Date",
      width: 150,
    },
    {
      field: "viewDate",
      headerName: "View Date",
      width: 150,
    },
    {
      field: "propertyTitle",
      headerName: "Property Name",
      width: 260,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Link to={"/bookings/" + params.row.id}>
              <button className="userListEdit">Update</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <Box padding="0 20px" height="80vh">
       <Typography variant="h5" fontSize={{ xs: "19px", sm: "28px" }} mb={4}>
        House Bookings
      </Typography>{" "}
      <DataGrid
        rows={bookingFiltered}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </Box>
  );
}
