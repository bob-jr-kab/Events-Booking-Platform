import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function MenuAppBar() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [avatarMenuEl, setAvatarMenuEl] = React.useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle avatar menu click
  const handleAvatarClick = (event) => {
    setAvatarMenuEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuEl(null);
  };

  // Toggle sidebar visibility
  const toggleSidebar = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSidebarVisible(open);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "80px" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#4D869C",
          top: 0,
          padding: "0px 50px 0px 20px", // Adjust padding to reduce excess space
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "100%",
            margin: "0 auto",
            paddingLeft: "16px",
            paddingRight: "20px",
            width: "100%",
          }}
        >
          {/* Menu toggle for mobile */}
          {isSmallScreen && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            Cyprus Events
          </Typography>

          {/* Avatar and links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
              justifyContent: "flex-end",
              maxWidth: "100%",
            }}
          >
            {/* Show links only on larger screens */}
            {!isSmallScreen && (
              <>
                <Link
                  to="/bookings"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body1">Bookings</Typography>
                </Link>

                <Link
                  to="/create_event"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body1">Create a post</Typography>
                </Link>
              </>
            )}

            <Avatar
              sx={{
                bgcolor: "#9DA8AD",
                width: 36,
                height: 36,
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            />
            <Menu
              anchorEl={avatarMenuEl}
              open={Boolean(avatarMenuEl)}
              onClose={handleAvatarMenuClose}
            >
              <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleAvatarMenuClose}>
                <Link
                  to="/Admin"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Admin
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar for mobile */}
      <Drawer
        anchor="left" // Open from the left
        open={sidebarVisible}
        onClose={toggleSidebar(false)}
        sx={{
          top: "55px",
          backdropFilter: "blur(2px)", // Apply glass-like effect
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100%", // Set a fixed width for the drawer
            padding: "20px",
            textAlign: "center",
            backgroundColor: "ButtonShadow",
            top: "100px",
          }}
          role="presentation"
          onClick={toggleSidebar(false)}
          onKeyDown={toggleSidebar(false)}
        >
          <List>
            <ListItem button component={Link} to="/bookings">
              <ListItemText sx={{ color: "#507687" }} primary="Bookings" />
            </ListItem>
            <ListItem button component={Link} to="/create_event">
              <ListItemText sx={{ color: "#507687" }} primary="Create a post" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
