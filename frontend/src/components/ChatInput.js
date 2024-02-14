import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTimes,
  faBars,
  faUser, // User icon
  faRobot, // AI icon
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      // Add user message with sender type
      setMessages([...messages, { text: trimmed, sender: "user" }]);
      setInput("");

      // Make request to your server for AI response
      try {
        const response = await axios.post(
          "http://localhost:3000/startConversation",
          { userMessage: trimmed }
        );
        const aiMessage = response.data.message; // Assuming the response contains the AI message
        setMessages((messages) => [
          ...messages,
          { text: aiMessage, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Open Sidebar Button */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 text-white z-10"
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-black text-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <button
              className="text-white text-lg font-bold"
              onClick={toggleSidebar}
            >
              New Chat
            </button>
            <FontAwesomeIcon icon={faTimes} onClick={toggleSidebar} />
          </div>
          <div className="p-4">
            <div>Chat 1</div>
            <div>Chat 2</div>
            <div>Chat 3</div>
            <div>Chat 4</div>
            <div>Chat 5</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
