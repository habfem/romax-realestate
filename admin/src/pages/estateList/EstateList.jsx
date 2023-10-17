import "./estatelist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import makeToast from "../../toaster";
import { deleteEstate, getEstates } from "../../redux/apiCalls";

export default function EstateList() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const timelines = useSelector((state) => state.estate.estates);

  useEffect(() => {
    getEstates(dispatch);
  }, [dispatch, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await deleteEstate(id, dispatch);
      makeToast("success", "Estate deleted successfully");
    } catch (error) {
      makeToast("error", "Failed to delete Estate");
    }
  };

  const filteredEstate = timelines.filter((timeline) =>
    timeline.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "estate",
      headerName: "Estate",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.categories}
          </div>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.location}
          </div>
        );
      },
    },
    {
      field: "house",
      headerName: "House",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.house}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/estate/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ width: "80%", height: "100vh" }}>
      <Header
        title={"Esatate List"}
        placeholder="Search Esatate..."
        button="Add Esatate"
        route="estate/newestate"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="productList" style={{ height: "calc(100vh - 64px)" }}>
        <DataGrid
          rows={filteredEstate}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </div>
  );
}