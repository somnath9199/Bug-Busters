import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const FinanceAssistant = () => {
  const [salesData, setSalesData] = useState([]); // Store sales data as an array
  const [selectedSalesData, setSelectedSalesData] = useState(''); // Store the selected sales data
  const [question, setQuestion] = useState(''); // User's question
  const [fileName, setFileName] = useState(''); // Sales data filename if selected
  const [bussinesstype, setBusinessType] = useState(''); // Business type for general queries
  const [isUsedSalesdata, setIsUsedSalesdata] = useState(false); // Whether sales data is used
  const [chatHistory, setChatHistory] = useState([]); // Stores chat conversation
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const user_id = decodedToken.userId;

        const response = await axios.post('api/v1/Salesdata', { id: user_id });
        if (response.data.message === "No Sales Data Found") {
          console.log("No data found");
        } else {
          setSalesData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("Some error occurred", error);
      }
    };

    fetchSalesData();
  }, []);

  // Function to handle submitting a query
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) {
      toast.error("Please enter a question.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('api/v1/GetFinanceAssistant', {
        fileName,
        isUsedSalesdata,
        question,
        bussinesstype,
      });

      // Update the chat history with the question and response
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: question },
        { type: 'response', text: response.data.message }
      ]);

      setQuestion('');
      setLoading(false);
      toast.success("Query processed successfully");
    } catch (error) {
      toast.error("Error processing query");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between p-6 bg-gray-200">
      <div className="h-3/4 p-6 bg-white rounded-lg shadow-md overflow-y-auto mb-4">
        {chatHistory.length > 0 ? (
          chatHistory.map((message, index) => (
            <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}>
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Start a conversation by asking a question.</p>
        )}
      </div>

      {/* Input Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <textarea
          value={question} required
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your financial question..."
          className="p-3 rounded-lg shadow-sm border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none resize-none h-24"
        ></textarea>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={isUsedSalesdata}
            onChange={(e) => {
              setIsUsedSalesdata(e.target.checked);
              if (!e.target.checked) setSelectedSalesData(''); // Clear selection if checkbox is unchecked
            }}
            className="text-blue-600 focus:ring-blue-500"
          />
          Include Sales Data
        </label>

        {isUsedSalesdata && (
          <>
            <select
              value={selectedSalesData}
              onChange={(e) => {
                setSelectedSalesData(e.target.value);
                setFileName(e.target.value); // Update fileName with the selected value
              }}
              className="p-3 rounded-lg shadow-sm border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select Sales Data</option>
              {salesData.map((data, index) => (
                <option key={index} value={data.fileName}>
                  {data.fileName}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter Sales Report Filename"
              className="p-3 rounded-lg shadow-sm border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </>
        )}

        <input
          type="text" required
          value={bussinesstype}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Enter your business type"
          className="p-3 rounded-lg shadow-sm border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
        />

        <button
          type="submit"
          className={`p-3 rounded-lg text-white ${loading ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Query'}
        </button>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
export default FinanceAssistant;
