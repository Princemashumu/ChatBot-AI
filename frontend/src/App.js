import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const { data } = await axios.post("http://localhost:5000/chat", { message: input });
      setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Chatbot</h2>
      <div style={{ minHeight: "200px", border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.role === "user" ? "blue" : "green" }}>
            {msg.content}
          </p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} style={{ width: "80%" }} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
