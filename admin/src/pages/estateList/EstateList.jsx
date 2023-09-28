import "./estatelist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTimeline, getTimeline } from "../../redux/apiCalls";

export default function EstateList() {
  const dispatch = useDispatch();
  const timelines = useSelector((state) => state.timeline.timelines);

  useEffect(() => {
    getTimeline(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteTimeline(id, dispatch);
  };

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
    <div className="productList">
      <DataGrid
        rows={timelines}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}