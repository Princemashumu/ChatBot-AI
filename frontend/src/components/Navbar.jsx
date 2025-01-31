import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

function Navbar() {
  const handleSignIn = () => {
    // Add logic for sign-in functionality here (e.g., open login dialog, redirect to login page)
    alert("Sign In button clicked");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#6200ea", width:"100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Karabo</Typography>
        <Button color="inherit" onClick={handleSignIn}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
