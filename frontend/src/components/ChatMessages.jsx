import React, { useEffect, useRef } from "react";
import { Box, Container, Typography, Avatar } from "@mui/material";
import chatbotlogo from "../assets/chatbotlogo1.png";

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest message when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container width="100%" sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
      <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            component="li"
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 1.5,
              alignItems: "center",
            }}
          >
            {msg.sender === "bot" && (
              <Avatar src={chatbotlogo} alt="logo" sx={avatarStyle} />
            )}
            <Box
              sx={{
                padding: "10px 15px",
                borderRadius: "10px",
                backgroundColor: msg.sender === "user" ? "#F5F5F5" : "#fff",
                color: "#333",
                maxWidth: "100%",
                textAlign: "left",
                minWidth: "150px",
              }}
            >
              {msg.heading && (
                <Typography
                  variant="h6"
                  sx={{ margin: "0 0 8px", fontWeight: "bold" }}
                >
                  {msg.heading} {/* Display the heading */}
                </Typography>
              )}
              <Typography variant="body1" sx={{ margin: 0 }}>
                {msg.body || msg.text} {/* Display the body */}
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                {msg.time} {/* Display time */}
              </Typography>
            </Box>
          </Box>
        ))}
        {/* Empty div to scroll to the latest message */}
        <div ref={messagesEndRef} />
      </Box>
    </Container>
  );
}

const avatarStyle = {
  width: 50,  // Ensures consistent size
  height: 50, // Ensures consistent size
  fontWeight: "bold",
  margin: "0 8px",
};

export default ChatMessages;
