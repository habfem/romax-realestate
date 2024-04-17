import "./userList.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import makeToast from "../../toaster";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  //const [data, setData] = useState(userRows);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  const userIsMainAdmin = users.find((user) => user.MainAdmin);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch, searchQuery]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, dispatch);
      makeToast("success", "User deleted successfully");
    } catch (error) {
      makeToast("error", "Failed to delete timeline");
    }
  };

  const filteredUser = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()))

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.email}
          </div>
        );
      },
    },
    /* {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.isAdmin}
          </div>
        );
      },
    }, */
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: "80vh", padding: "0 20px" }}>
      <Header
        title={"User List"}
        placeholder="Search User..."
        button={userIsMainAdmin ? "Add User" : null}
        route="user/newuser"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="userList" style={{ height: "calc(100vh - 64px)" }}>
        <DataGrid
          rows={filteredUser}
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
