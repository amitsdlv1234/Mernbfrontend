import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = ({ setAdminName }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      alert("Please fill in both fields");
    } else {
      console.log("Login attempted:", userName, password);
      localStorage.setItem("userName", userName); // Store userName in localStorage
      setAdminName(userName); // Set adminName state
      navigate("/AdminDashboard"); // Redirect to Admin Dashboard
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Logo
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Login Page
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
