import * as React from "react";
import logo from "../../assets/images/logo.jpg";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LoginIcon from "@mui/icons-material/Login";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, Person3Rounded } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import "./AppBar.css";
import { auth } from "../../services/firebase.js";
import { useState } from "react";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
window.onunload = () => {
  // Clear the local storage
  window.localStorage.clear();
};
export default function NavBar() {
  const user = auth.currentUser;

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  let navigate = useNavigate();
  const navtologin = () => {
    navigate("/Login");
  };
  const navtosignup = () => {
    navigate("Signup");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/Login");
    });
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="medium" color="inherit" onClick={navtosignup}>
          <PersonAddAlt1Icon />
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="medium" color="white" onClick={navtologin}>
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#0A2A3C" }}>
        <Toolbar>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="outlined"
                  style={{ color: "white" }}
                  {...bindTrigger(popupState)}
                >
                  <MenuIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>
                    {" "}
                    <HomeSharpIcon /> Home
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <GroupsSharpIcon />
                    About Us
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <div className="logo">
            <div className="logo-image">
              <img src={logo}></img>
            </div>
            <div className="logo-text">FINTELLIGENT</div>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuth ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={navtosignup}
                size="large"
                color="white"
              >
                <PersonAddAlt1Icon
                  style={{ fontSize: "2rem", color: "white" }}
                />
                <p style={{ fontSize: "1rem", color: "white" }}>Signup</p>
              </IconButton>
              <IconButton size="medium" color="white" onClick={navtologin}>
                <LoginOutlined style={{ fontSize: "2rem", color: "white" }} />
                <p style={{ fontSize: "1rem", color: "white" }}>Login</p>
              </IconButton>
            </Box>
          ) : (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Avatar
                    alt={user.displayName}
                    src={`${user.photoURL}`}
                    sx={{ width: 39, height: 39 }}
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      <Person3Rounded />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <SettingsIcon />
                      Settings
                    </MenuItem>
                    {isAuth ? (
                      <MenuItem onClick={(popupState.close, signUserOut)}>
                        {" "}
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    ) : (
                      <></>
                    )}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="white"
            >
              <MoreIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
