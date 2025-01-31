import React, { useState } from "react";
import { Box, Container, TextField, Button, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

function ChatInput({ message, setMessage, sendMessage }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
  };

  return (
    <Container Width="100%">
      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          
        }}
      ><IconButton
      onClick={handleVoiceInput}
      sx={{
        backgroundColor: isListening ? "#ff4081" : "#6200ea",
        color: "#fff",
        borderRadius: "50%",
        "&:hover": { backgroundColor: isListening ? "#e91e63" : "#3700b3" },
      }}
    >
      <MicIcon />
    </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              "&:hover fieldset": { borderColor: "#6200ea" },
              "&.Mui-focused fieldset": { borderColor: "#6200ea" },
            },
          }}
        />
        
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            backgroundColor: "#6200ea",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "24px",
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#3700b3" },
            "&:active": { transform: "scale(0.95)" },
          }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default ChatInput;
