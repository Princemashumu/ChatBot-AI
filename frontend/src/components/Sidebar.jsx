import React from "react";
import { Drawer, Typography, IconButton, Box, Button, List, ListItem, ListItemText } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // Chat icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import logo from "../assets/logo.png";

function Sidebar({ sidebarOpen, toggleSidebar, startNewChat, loadChatHistory, chatHistory, deleteChat }) {
  return (
    <Drawer
      anchor="left"
      open={sidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: "#F5F5F5",
          color: "#fff",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: "25px",
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", padding: "10px" }}>
        <img src={logo} alt="Karabo Logo" style={{ width: 60, height: 60, marginRight: 10 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", fontSize: "1.1rem", letterSpacing: 0.5 }}>
          KARABO
        </Typography>
      </Box>

      {/* New Chat Button */}
      <Button
        fullWidth
        startIcon={<ChatIcon />}
        sx={{
          color: "#333",
          justifyContent: "flex-start",
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px",
          borderRadius: "25px",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "25px" },
        }}
        onClick={startNewChat} // Start a new chat
      >
        New Chat
      </Button>

      {/* Chat History (Commented out for now) */}
      {/* <Box sx={{ padding: "10px 0", overflowY: "auto", maxHeight: "60%" }}>
        <Typography variant="h6" sx={{ color: "#333", fontSize: "1rem", fontWeight: "bold" }}>
          Chat History
        </Typography>
        <List>
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => {
              // Extract the first user message to use as chat name
              const chatName = chat.messages[0]?.sender === "user" ? chat.messages[0]?.text : "Untitled Chat";

              return (
                <ListItem
                  key={index}
                  button
                  onClick={() => loadChatHistory(chat)} // Load the clicked chat
                  sx={{
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "25px",
                    color: "#333",
                    display: "flex",
                    justifyContent: "space-between", // Space between name and delete button
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: "25px" },
                  }}
                >
                  <ListItemText
                    primary={chatName} // Display chat name based on the first user message
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the chat from being loaded
                      deleteChat(chat.id); // Delete the chat when delete icon is clicked
                    }}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })
          ) : (
            <Typography variant="body2" sx={{ color: "#333", textAlign: "center", padding: "10px" }}>
              No chats available
            </Typography>
          )}
        </List>
      </Box> */}
    </Drawer>
  );
}

export default Sidebar;
