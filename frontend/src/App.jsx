import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProductList from "./pages/product-list";
import Product from "./pages/product-description";
import Register from "./pages/Register";
import Login from "./pages/Login";
//import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import Estate from "./pages/estate-description";
import UserDashBoard from "./pages/user-dashboard";
import About from "./pages/About";
import EstateListing from "./pages/estate-list";
import Booking from "./pages/booking";
import FAQ from "./pages/faq";
import EstateBooking from "./pages/estate-booking";
import ResetPassword from "./pages/ResetPassword";
import Blog from "./pages/Blog";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/success" element={<Success />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/estate/:id" element={<Estate />} />
          <Route path="/estate" element={<EstateListing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookings/:id" element={<EstateBooking />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blogs" element={<Blog /> } />


          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login bgcolor="#F6F9FC" />}
          />
          <Route path="/user/*" element={user ? <UserDashBoard /> : <Login />} />

        </Routes>
      </LocalizationProvider>
    </Router>
  );
}

export default App;
