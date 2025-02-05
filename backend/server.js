
//Open ai

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Configuration, OpenAIApi } from "openai";
// import rateLimit from "express-rate-limit";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Rate limiting to prevent hitting OpenAI rate limits
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5, // Limit each IP to 5 requests per minute
//   message: "Too many requests, please try again later.",
// });
// app.use("/chat", limiter);

// const openai = new OpenAIApi(
//   new Configuration({ apiKey: process.env.OPENAI_API_KEY })
// );

// // Function to handle retries if OpenAI returns a 429 error
// async function chatWithOpenAI(message, retries = 3) {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: message }],
//       });
//       return response.data.choices[0].message.content;
//     } catch (error) {
//       console.error(`Attempt ${i + 1} failed:`, error.response?.data || error.message);
//       if (error.response?.status !== 429 || i === retries - 1) throw error;
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 sec before retry
//     }
//   }
// }

// // Chat endpoint with retry logic
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }
    
//     const reply = await chatWithOpenAI(message);
//     res.json({ reply });
//   } catch (error) {
//     console.error("OpenAI API Error:", error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


//Dialogflow 

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { SessionsClient } from "@google-cloud/dialogflow"; // Google Dialogflow SDK
// import rateLimit from "express-rate-limit";
// import { v4 as uuidv4 } from "uuid"; // To generate unique session IDs

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Rate limiting to prevent hitting Dialogflow rate limits
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5, // Limit each IP to 5 requests per minute
//   message: "Too many requests, please try again later.",
// });
// app.use("/chat", limiter);

// // Initialize Dialogflow client
// const sessionClient = new SessionsClient();
// const projectId = process.env.DIALOGFLOW_PROJECT_ID; // Your Dialogflow project ID
// const languageCode = "en"; // You can change this based on user language

// // Chat endpoint using Dialogflow
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // Generate a unique session ID for each request
//     const sessionId = uuidv4();
//     const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

//     // Prepare the request to Dialogflow
//     const request = {
//       session: sessionPath,
//       queryInput: {
//         text: {
//           text: message,
//           languageCode: languageCode,
//         },
//       },
//     };

//     // Send request to Dialogflow
//     const [response] = await sessionClient.detectIntent(request);
//     const reply = response.queryResult.fulfillmentText;

//     res.json({ reply });
//   } catch (error) {
//     console.error("Dialogflow API Error:", error.message);
//     res.status(error.code || 500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));



//Gemini ai 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini SDK
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting to prevent excessive requests
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: "Too many requests, please try again later.",
});
app.use("/chat", limiter);

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Path to the JSON file storing chat messages
const chatFilePath = path.join(__dirname, "chatMessages.json");

// Route to handle chat messages (AI responses)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate response using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const reply = result.response.text();

    // Save the chat to JSON file
    saveChatMessage("user", message); // Save user message
    saveChatMessage("bot", reply);    // Save bot reply

    res.json({ reply });
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route to retrieve stored chat messages
app.get("/chats", (req, res) => {
  fs.readFile(chatFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading chat messages" });
    }
    res.json(JSON.parse(data));
  });
});

// Function to save chat message to the file
const saveChatMessage = (sender, message) => {
  fs.readFile(chatFilePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading chat messages:", err);
      return;
    }

    const chatMessages = err ? [] : JSON.parse(data);
    chatMessages.push({ sender, message, time: new Date().toISOString() });

    fs.writeFile(chatFilePath, JSON.stringify(chatMessages, null, 2), (err) => {
      if (err) {
        console.error("Error saving chat messages:", err);
      }
    });
  });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
