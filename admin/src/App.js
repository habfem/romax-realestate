import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./components/SideBar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Bookings from "./pages/booking/BookingList";
import Booking from "./pages/booking/Booking";
//import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import AddFaq from "./pages/faq/AddFaq";
import Faqs from "./pages/faq/Faqs";
import TimelineList from "./pages/timelineList/TimelineList";
import Timeline from "./pages/timeline/Timeline"
import NewTimeline from "./pages/newTimeline/newTimeline";
import EstateList from "./pages/estateList/EstateList";
//import Estate from "./pages/estate/Estate";
import NewEstate from "./pages/newEstate/newEstate";
import EstateBookings from "./pages/bookingEstate/BookingList";
import EstateBooking from "./pages/bookingEstate/Booking";
import { useSelector } from "react-redux";


function App() {
  function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user.currentUser);
    const isAuthorized = user && user?.isAdmin;
    return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
  }
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/*"
        element={
          <PrivateRoute >
            <>
              <Topbar handleDrawerOpen={handleDrawerOpen} />
              <Box display={{ xs: "block", md: "flex" }} position="relative" mt={2.5} mb={3}>
                <Box display={{ xs: "none", md: "block" }}
                >
                  <Sidebar />
                </Box>
                <Box flex={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/user/:userId" element={<User />} />
                      <Route path="/user/newuser" element={<NewUser />} />
                      <Route path="/products" element={<ProductList />} />
                      <Route path="/estates" element={<EstateList />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/estatebookings" element={<EstateBookings />} />
                      <Route path="/estatebookings/:id" element={<EstateBooking />} />
                      <Route path="/bookings/:id" element={<Booking />} />
                      <Route path="/timelines" element={<TimelineList />} />
                      <Route path="/product/:id" element={<NewProduct />} />
                      <Route path="/timeline/:timelineId" element={<Timeline />} />
                      <Route path="timeline/newtimeline" element={<NewTimeline />} />
                      <Route path="/estate/:id" element={<NewEstate />} />
                      <Route path="/faq/:id" element={<AddFaq />} />
                      <Route path="/faqs" element={<Faqs />} />


                    </Routes>
                  </LocalizationProvider>
                </Box>

                <Drawer
                  open={drawerOpen}
                  onClose={handleDrawerClose}
                  anchor="left"
                  sx={{
                    zIndex: "1200",
                    "& .MuiPaper-root": {
                      backgroundColor: "#2B3445",
                    },
                  }}
                >
                  <Sidebar handleDrawerClose={handleDrawerClose} />
                </Drawer>
              </Box>
            </>
          </PrivateRoute>

        }
      />


    </Routes>

  );
}

export default App;