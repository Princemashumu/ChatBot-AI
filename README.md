# **ChatBot-AI using Dialogflow ES & React.js**

Here are the **requirements** for a **predefined chatbot** using **Google Dialogflow ES** with a **custom chatbot UI in React.js**. 🚀  

---

# **📌 Project Requirements: Predefined Chatbot using Dialogflow ES & React.js**

## **1️⃣ Project Overview**
Develop a **predefined chatbot** using **Google Dialogflow ES** and integrate it into a **custom chatbot UI built with React.js**. The chatbot will respond to user queries based on predefined intents and responses.

---

## **2️⃣ Functional Requirements**
### ✅ **User Interactions**
- The chatbot should handle **greetings** (e.g., "Hello", "Hi").
- The chatbot should provide **basic FAQ responses** (e.g., "What is your name?", "How can I contact support?").
- The chatbot should handle **goodbye messages** (e.g., "Bye", "See you later").
- The chatbot should handle **fallback responses** when the user asks an unknown question.

### ✅ **Predefined Intents in Dialogflow ES**
The chatbot should recognize and respond to the following **predefined intents**:  
1. **Greeting Intent** (`greet`) → Responds to "Hello", "Hi", etc.  
2. **Goodbye Intent** (`goodbye`) → Responds to "Bye", "See you".  
3. **FAQ Intent** (`faq`) → Responds to predefined FAQs.  
4. **Fallback Intent** (`fallback`) → Handles unknown questions.  

### ✅ **Predefined Responses**
- Example responses:
  - **Greet** → "Hello! How can I help you today?"
  - **Goodbye** → "Goodbye! Have a nice day!"
  - **FAQ Example** → "Dialogflow is a natural language understanding platform."
  - **Fallback** → "I'm sorry, I don't understand. Can you rephrase that?"

---

## **3️⃣ Technical Requirements**
### ✅ **Development Environment**
- **Google Dialogflow ES** (Cloud-based chatbot platform)
- **React.js** (Frontend UI framework)
- **Node.js & Express (Optional for backend API)**
- **Dialogflow API** (To communicate between React UI and Dialogflow)
- **Firebase or Webhooks (Optional for dynamic responses)**

### ✅ **Installation & Setup**
1. **Create a Dialogflow Agent**
   - Go to **Dialogflow Console** → Create a new agent.
   - Define **intents, responses, and fallback messages**.
   
2. **Enable Dialogflow API**
   - Go to **Google Cloud Console**.
   - Enable the **Dialogflow API**.
   - Generate a **service account key (JSON file)** for authentication.

3. **Set up a React Project**
   ```bash
   npx create-react-app chatbot-ui
   cd chatbot-ui
   npm install axios react-chatbot-kit
   ```

4. **Create an Express Backend (Optional, if needed for authentication)**
   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install express cors axios dotenv
   ```

---

## **4️⃣ Implementation Details**
### ✅ **Key Dialogflow Files**
1. **Intents & Responses** (Configured in Dialogflow ES console)
2. **Dialogflow API Key** (Downloaded as a JSON file from Google Cloud Console)
3. **Webhook Integration** (Optional for dynamic responses)

### ✅ **React.js Chatbot UI Components**
1. **Chat Interface** → Text input field + chat bubbles.
2. **API Handler** → Fetches responses from Dialogflow.
3. **State Management** → Manages chat history.

---

## **5️⃣ Example Code**
### ✅ **React: Chatbot Component (`Chatbot.js`)**
```jsx
import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>{msg.text}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
```

---

### ✅ **Express Backend (`server.js`)**
```js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const dialogflowApiUrl = "https://api.dialogflow.cloud.google.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/123456:detectIntent";

  try {
    const response = await axios.post(dialogflowApiUrl, {
      queryInput: {
        text: {
          text: userMessage,
          languageCode: "en"
        }
      }
    }, {
      headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` }
    });

    res.json({ reply: response.data.queryResult.fulfillmentText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error fetching response." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

---

## **6️⃣ Running the Chatbot**
1. **Start the Backend Server**:  
   ```bash
   node server.js
   ```
2. **Run the React Frontend**:  
   ```bash
   npm start
   ```
3. **Test the chatbot UI** in the browser!

---

## **7️⃣ Deployment (Optional)**
- **Deploy on Firebase, AWS, or Heroku**
- **Embed chatbot UI in an existing website**
- **Integrate with WhatsApp, Facebook Messenger, or Telegram**

---
