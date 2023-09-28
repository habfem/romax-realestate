import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Bookings from "./pages/booking/BookingList";
import Booking from "./pages/booking/Booking";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import AddFaq from "./pages/faq/AddFaq";
import Faqs from "./pages/faq/Faqs";
import TimelineList from "./pages/timelineList/TimelineList";
import Timeline from "./pages/timeline/Timeline"
import NewTimeline from "./pages/newTimeline/newTimeline";
import EstateList from "./pages/estateList/EstateList";
import Estate from "./pages/estate/Estate";
import NewEstate from "./pages/newEstate/newEstate";

function App() {

  //const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser.isAdmin


  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        {admin && (
          <>
            <Route
              path="/*"
              element={
                <>
                  <Topbar />
                  <div className="container">
                    <Sidebar />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/newUser" element={<NewUser />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/estates" element={<EstateList />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/bookings/:id" element={<Booking />} />
                        <Route path="/timelines" element={<TimelineList />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/estate/:estateId" element={<Estate />} />
                        <Route path="/timeline/:timelineId" element={<Timeline />} />
                        <Route path="/newtimeline" element={<NewTimeline />} />
                        <Route path="/newestate" element={<NewEstate />} />
                        <Route path="/newproduct" element={<NewProduct />} />
                        <Route path="/faq/:id" element={<AddFaq />} />
                        <Route path="/faqs" element={<Faqs />} />


                      </Routes>
                    </LocalizationProvider>

                  </div>
                </>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;