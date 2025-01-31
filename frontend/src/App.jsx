import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box, Paper, IconButton, CircularProgress } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatMessages from "../src/components/ChatMessages";
import ChatInput from "../src/components/ChatInput";
import Sidebar from "../src/components/Sidebar"; // Import Sidebar component

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar open/close state
  const [loading, setLoading] = useState(false); // Loading state
  const [chatHistory, setChatHistory] = useState([]); // Store chat history (empty initially)

  // Function to start a new chat
  const startNewChat = () => {
    const initialMessage = {
      text: "Hi, my name is Karabo. How can I help you?",
      sender: "bot",
      time: dayjs().format("hh:mm A"),
    };
    setMessages([initialMessage]); // Set the initial message to begin the new chat
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { id: Date.now(), messages: [initialMessage], title: "Untitled Chat" },
    ]); // Add the current chat to chat history
  };

  // Function to load chat history into the chat window
  const loadChatHistory = (chat) => {
    setMessages(chat.messages);
    console.log("Loaded chat history:", chat); // Debugging
  };

  // Function to delete a chat from the history
  const deleteChat = (chatId) => {
    setChatHistory((prevHistory) =>
      prevHistory.filter((chat) => chat.id !== chatId)
    );
    console.log(`Deleted chat with ID: ${chatId}`);
  };

  useEffect(() => {
    startNewChat(); // Initialize with a single chat when the component mounts
  }, []); // Only run once on component mount

  const sendMessage = async () => {
    if (message.trim()) {
      const timestamp = dayjs().format("hh:mm A");
      const userMessage = { text: message, sender: "user", time: timestamp };
      setMessages((prev) => [...prev, userMessage]); // Add user message
      setMessage(""); // Clear input
      setLoading(true); // Start loading
  
      // Show loading indicator
      const loadingMessage = { text: <CircularProgress size={20} />, sender: "bot", time: timestamp };
      setMessages((prev) => [...prev, loadingMessage]);
  
      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        const data = await res.json();
  
        // If the bot doesn't reply or response is empty, set a default message
        if (!data.reply) {
          setMessages((prev) => [
            ...prev.slice(0, -1), // Remove loading indicator
            { text: "Sorry, I didn't get that. Can you please rephrase?", sender: "bot", time: dayjs().format("hh:mm A") },
          ]);
        } else {
          setMessages((prev) => [
            ...prev.slice(0, -1), // Remove loading indicator
            { text: data.reply, sender: "bot", time: dayjs().format("hh:mm A") },
          ]);
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove loading indicator
          { text: "Error fetching response. Please try again.", sender: "bot", time: dayjs().format("hh:mm A") },
        ]);
      }
  
      setLoading(false); // Stop loading
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%", // Full width
        height: "100%", // Full height
        position: "absolute",
        top: "0%",
        left: "50%",
        transform: "translateX(-50%)", // Center content horizontally
        backgroundColor: "#F5F5F5",
        alignItems: "center", // Center content
        justifyContent: "center", // Center content vertically
      }}
    >
      {/* Sidebar with the startNewChat, loadChatHistory, and deleteChat functions passed */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        startNewChat={startNewChat}
        loadChatHistory={loadChatHistory}
        chatHistory={chatHistory}
        deleteChat={deleteChat} // Pass the delete function to Sidebar
      />

      {/* Chat Section */}
      <Paper
        elevation={3}
        sx={{
          height: "90%", // Chat container height
          width: "100%", // Full width
          maxWidth: "800px", // Limit width to 800px
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <IconButton
          sx={{ position: "absolute", left: 10 }}
          onClick={toggleSidebar}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Paper>
    </Box>
  );
}

export default Chatbot;
