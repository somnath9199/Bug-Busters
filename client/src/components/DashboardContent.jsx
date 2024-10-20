import React, { useRef, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import UploadImg from '../assets/upload.svg';
import { Toaster, toast } from 'react-hot-toast';

const DashboardContent = () => {
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [fileName, setFileName] = useState(''); // To store file name entered by user
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
  const [uploadStatus, setUploadStatus] = useState(''); // For showing the status of the upload

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Open the file input when user clicks "Upload"
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission to upload file and file name
  const handleFileUpload = async () => {
    if (!selectedFile || !fileName) {
      setUploadStatus('Please provide both a file and a file name.');
      return;
    }

    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setUploadStatus('No token found. Please log in.');
      return;
    }

    // Decode the token to extract the user_id
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Adjust this based on the structure of your JWT payload

    // Create a FormData object to send file, file name, and user_id
    const formData = new FormData();
    formData.append('csvfile', selectedFile);
    formData.append('fileName', fileName);
    formData.append('user_id', userId); // Send user_id as part of the form data

    try {
      const response = await axios.post('api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('File uploaded successfully!');
      setShowModal(false); // Close modal on success
      console.log('Response:', response.data);
      toast.success('File Uploaded Successfully');
    } catch (error) {
      setUploadStatus('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white p-4">
        {/* Button to open modal */}
        <img 
          src={UploadImg} 
          alt="Upload Illustration" 
          className="w-full h-[35rem]" 
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload Sales Data
        </button>

        {/* Modal for uploading file and entering file name */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
              <h2 className="text-lg font-semibold mb-4">Upload Sales File</h2>

              {/* File name input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter file name"
                />
              </div>

              {/* File input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Upload and Cancel buttons */}
              <div className="flex justify-end">
                <button
                  onClick={handleFileUpload}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 mr-2"
                >
                  Upload
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>

              {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
            </div>
          </div>
        )}
      </div>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default DashboardContent;
