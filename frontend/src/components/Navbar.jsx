import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#FCCD2A" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "1366px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
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
              Platform
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" gap={3}>
            <Button component={Link} to="/events" color="inherit">
              Events
            </Button>
            <Button component={Link} to="/booking" color="inherit">
              Booking
            </Button>
          </Box>
          <Avatar sx={{ bgcolor: "blue", width: 36, height: 36 }}>U</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
