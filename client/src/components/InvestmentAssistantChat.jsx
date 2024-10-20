import React, { useState } from "react";
import axios from "axios";

const InvestmentAssistantChat = () => {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! How can I assist you with your finances today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "User", text: input }]);
      const userInput = input;
      setInput("");

      try {
        // Make the API request using Axios
        const response = await axios.post("api/v1/getInvestmentAssistance", {
          userPrompt: userInput
        });

        // Assuming the AI response is in response.data.message
        const aiResponse = response.data.message;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "AI", text: aiResponse }
        ]);
      } catch (error) {
        console.error("Error fetching AI response: ", error);

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "AI", text: "Sorry, something went wrong. Please try again." }
        ]);
      }
    }
  };
  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen p-4 md:p-10 overflow-y-hidden">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold bg-gray-100 p-3 text-blue-600 mb-4 text-center">
          Investment Assistant
        </h1>
        <div className="bg-gray-50 rounded-lg shadow-inner p-4 md:p-6 flex flex-col h-[55vh] md:h-[60vh] overflow-y-scroll mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === "User" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block rounded-2xl px-3 py-2 md:px-4 md:py-2 shadow-sm ${message.sender === "User"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow p-3 md:p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            placeholder="Ask your finance query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 md:ml-4 bg-blue-600 text-white rounded-full px-6 py-2 md:px-10 md:py-2 hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAssistantChat;
