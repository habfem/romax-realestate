import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  TimelineOutlined,
  HouseOutlined,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  BookmarkBorderOutlined,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";

const SideBar = ({ handleDrawerClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        borderRadius: "10px",
        "& .ps-sidebar-root": {
          width: "280px",
          minWidth: "280px",
          height: "100%",
        },
      }}
    >
      <Sidebar
        rootStyles={{
          [`.ps-sidebar-container`]: {
            backgroundColor: "#fbfbff",
            color: "#555",
            padding: "20px",
            "&::-webkit-scrollbar": {
              // height: "3px",
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#344054",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#7d879c",
              borderRadius: "100px",
            },
          },
          [`.ps-menuitem-root a`]: {
            height: "auto !important",
            padding: "0px !important"
          },
          [`.ps-menu-button:hover`]: {
            backgroundColor: "transparent !important",
          },
          [`.ps-submenu-content ul li`]: {
            padding: "10px !important",
          },


        }}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: {
              [`&.active`]: {
                // color: "#4E97FD",
              },
            },
          }}
        >
          <Typography variant="subtitle1" color="#bbbaba" >Dashboard</Typography>
          <MenuItem
            icon={<LineStyle />}
            component={<NavLink to={"/"} />}
          // onClick={handleDrawerClose}
          >
            {" "}
            Home
          </MenuItem>
          <MenuItem
            icon={<Timeline />}
            component={<NavLink to={"/"} />}
          // onClick={handleDrawerClose}
          >
            {" "}
            Analytics
          </MenuItem><MenuItem
            icon={<TrendingUp />}
            component={<NavLink to={"/"} />}
          // onClick={handleDrawerClose}
          >
            {" "}
            Sales
          </MenuItem>


          <Typography variant="subtitle1" color="#bbbaba" marginTop="10px">Quick Menu</Typography>


          <SubMenu label="Users" icon={<PermIdentity />}>
            <MenuItem
              component={<NavLink to="/users" />}
              onClick={handleDrawerClose}
            >
              {" "}
              User List
            </MenuItem>
            <MenuItem
              component={<NavLink to="/user/newuser" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Create User{" "}
            </MenuItem>

          </SubMenu>
          <SubMenu label="Products" icon={<Storefront />}>
            <MenuItem
              component={<NavLink to="/products" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Product List
            </MenuItem>
            <MenuItem
              component={<NavLink to="/product/create" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Create Product{" "}
            </MenuItem>

          </SubMenu>
          <SubMenu label="Estates" icon={<HouseOutlined />}>
            <MenuItem
              component={<NavLink to="/estates" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Estate List
            </MenuItem>
            <MenuItem
              component={<NavLink to="/estate/create" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Create Estate{" "}
            </MenuItem>

          </SubMenu>
          <SubMenu label="Timelines" icon={<TimelineOutlined />}>
            <MenuItem
              component={<NavLink to="/timelines" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Timeline List
            </MenuItem>
            <MenuItem
              component={<NavLink to="/timeline/newtimeline" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Create Timeline{" "}
            </MenuItem>

          </SubMenu>
          <SubMenu label="FAQs" icon={<BarChart />}>
            <MenuItem
              component={<NavLink to="/faqs" />}
              onClick={handleDrawerClose}
            >
              {" "}
              FAQ List
            </MenuItem>
            <MenuItem
              component={<NavLink to="/faq/create" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Create FAQ{" "}
            </MenuItem>

          </SubMenu>

          <SubMenu label="Bookings" icon={<BookmarkBorderOutlined />}>
            <MenuItem
              component={<NavLink to="/bookings" />}
              onClick={handleDrawerClose}
            >
              {" "}
              House Bookings
            </MenuItem>
            <MenuItem
              component={<NavLink to="/estatebookings" />}
              onClick={handleDrawerClose}
            >
              {" "}
              Estate Bookings
            </MenuItem>

          </SubMenu>

          {/* <MenuItem
            icon={<LogoutIcon />}
            onClick={() => {
              dispatch(logout());

              navigate("/");
            }}
          >
            {" "}
            Logout
          </MenuItem> */}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
