import "./estatelist.css";
import { DataGrid } from "@material-ui/data-grid";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Switch,
  Grid,
  Box
} from "@mui/material";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { Edit, Delete } from "@material-ui/icons";
import {
  getEstates,
  resetState,
  deleteEstate,
} from "../../redux/estateRedux";
import makeToast from "../../toaster";


export default function EstateList() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getEstates());
    };
    fetchData();
  }, [searchQuery]);

  const estateState = useSelector((state) => state.estate);
  const { isSuccess, isError, isLoading, deletedEstate } = estateState;

  useEffect(() => {
    if (deletedEstate) {
      makeToast("success", "Estate deleted successfully!");
      dispatch(resetState());
      dispatch(getEstates());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [deletedEstate, isError]);

  const filteredEstates = estateState.estates.filter((estate) =>
    estate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const estates = filteredEstates.map((estate) => ({
    id: estate._id,
    title: estate.title,
    location: estate.location,
    house: estate.house,
    action: null,
  }));

  return (
    <Box sx={{
      px: 2
    }}>
      <Header
        title={"Estate List"}
        placeholder="Search Estate..."
        button="Add Estate"
        route="estate/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box sx={{
        height: "80vh"
      }}>
        <DataGrid
          rows={estates}
          columns={[
            {
              field: "id",
              headerName: "id",
              width: 200,
            },
            {
              field: "title",
              headerName: "Estate Title",
              width: 300,
            },
            {
              field: "location",
              headerName: "Estate Location",
              width: 200,
            },
            {
              field: "house",
              headerName: "Estate Houses",
              width: 70,
            },

            {
              field: "action",
              headerName: "Action",
              width: 200,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <Link to={`/estate/${row.id}`}>
                    <IconButton aria-label="Edit">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteEstate(row.id));
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              ),
            },
          ]}
        />
      </Box>

    </Box>
  );
}