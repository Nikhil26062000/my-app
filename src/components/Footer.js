import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QrCodeIcon from "@mui/icons-material/QrCode";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Footer = ({ color = "#000" }) => {
  const navigate = useNavigate();

  return (
    <BottomNavigation
      showLabels
      sx={{
        backgroundColor: color,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        sx={{ color: "white" }}
        onClick={() => navigate("/home")}
        aria-label="Navigate to home page"
      />

      <BottomNavigationAction
        label="Location"
        icon={<LocationOnIcon />}
        sx={{ color: "white" }}
        onClick={() => navigate("/camera")}
        aria-label="Navigate to Location"
      />
      <BottomNavigationAction
        label="Scan"
        icon={<QrCodeIcon />}
        sx={{ color: "white" }}
        onClick={() => navigate("/qrcode")}
        aria-label="Navigate to QR Code"
      />

      <BottomNavigationAction
        label="Posts"
        icon={<PostAddIcon />}
        sx={{ color: "white" }}
        onClick={() => navigate("/posts")}
        aria-label="Navigate to Posts"
      />

      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        sx={{ color: "white" }}
        onClick={() => navigate("/dashboard")}
        aria-label="Navigate to Settings"
      />
    </BottomNavigation>
  );
};

export default Footer;
