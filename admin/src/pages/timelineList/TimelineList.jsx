import "./timelinelList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import makeToast from "../../toaster";
import { deleteTimeline, getTimeline } from "../../redux/apiCalls";

export default function TimelineList() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const timelines = useSelector((state) => state.timeline.timelines);

  useEffect(() => {
    getTimeline(dispatch);
  }, [dispatch, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await deleteTimeline(id, dispatch);
      makeToast("success", "Timeline deleted successfully");
    } catch (error) {
      makeToast("error", "Failed to delete timeline");
    }
  };

  const filteredTimeline = timelines.filter((timeline) =>
    timeline.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "timeline",
      headerName: "Timeline",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "subtitle",
      headerName: "SubTitle",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.subtitle}
          </div>
        );
      },
    },
    {
      field: "dateText",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.dateText}
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
            <Link to={"/timeline/" + params.row._id}>
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
    <div style={{  height: "100vh", padding:"0 20px" }}>
      <Header
        title={"Timeline List"}
        placeholder="Search Timeline..."
        button="Add Timeline"
        route="timeline/newtimeline"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="productList" style={{ height: "calc(100vh - 64px)" }}>
        <DataGrid
          rows={filteredTimeline}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
          rowsPerPageOptions={[8, 16, 24]}
        />
      </div>
    </div>
  );
}