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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function MenuAppBar() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [avatarMenuEl, setAvatarMenuEl] = React.useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu")) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle avatar menu click
  const handleAvatarClick = (event) => {
    setAvatarMenuEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuEl(null);
  };

  // Toggle sidebar visibility
  const toggleSidebar = (event) => {
    event.stopPropagation(); // Prevent the global click listener from immediately closing the sidebar
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "80px" }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#276C78", top: 0, padding: "0px 80px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "100%", // Adjust to full width
            margin: "0 auto",
            paddingLeft: "16px", // Add padding to prevent overflow on small screens
            paddingRight: "16px",
            width: "100%",
          }}
        >
          {/* Menu and Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
              className="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              Cyprus Events
            </Typography>
          </Box>

          {/* Avatar and links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
              justifyContent: "flex-end",
              maxWidth: "100%", // Ensure everything is within the screen's width
            }}
          >
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

      {/* Sidebar */}
      {sidebarVisible && (
        <Box
          sx={{
            bgcolor: "#F5F5F5",
            padding: "20px",
            width: isSmallScreen ? "50%" : "9%",
            position: "absolute",
            top: "64px", // Adjust based on AppBar height (default 64px)
            left: 0,
            zIndex: 10,
          }}
          className="menu"
        >
          <List>
            <ListItem button component={Link} to="/listings">
              <ListItemText primary="Listings" />
            </ListItem>
            <ListItem button component={Link} to="/bookings">
              <ListItemText primary="Bookings" />
            </ListItem>
            <ListItem button component={Link} to="/events">
              <ListItemText primary="Events" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="More" />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}
