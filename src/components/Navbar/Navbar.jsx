import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure this is imported after installing the icons package

const Navbar = ({ adminName, setAdminName }) => {
  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear the user session
    setAdminName(''); // Clear adminName state
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src="path/to/logo.png" alt="Logo" style={{ height: "40px" }} />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            marginLeft: 0,
          }}
        >
          <Button component={Link} to="/AdminDashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} to="/CreateEmployee" color="inherit">
            Create Employee
          </Button>
          <Button component={Link} to="/EmployeeList" color="inherit">
            Employee List
          </Button>
        </Box>
        <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}>
          {adminName}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
