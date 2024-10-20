import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MySales = () => {
  const [salesData, setSalesData] = useState([]); // To store the fetched sales data (multiple files)
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(''); // To store any error messages

  const navigate = useNavigate();

  const getsalespage = (id) => {
    navigate(`/sales/${id}`);
  }

  const fetchSalesData = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }


      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const user_id = decodedToken.userId;

      const response = await axios.post('/api/v1/Salesdata', { id: user_id });

      if (response.data.message === "No Sales Data Found") {
        setError("No sales data found.");
      } else {
        setSalesData(response.data); 
        toast.success('Sales data fetched successfully');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching sales data');
      toast.error('Error fetching sales data');
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start bg-white p-4">
        <h2 className="text-2xl font-semibold mb-4">Sales Data</h2>

        {/* Display loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          salesData.length > 0 ? (
            salesData.map((item) => (
              <div
                key={item.id} // Use a unique key for each item
                className="p-6 cursor-pointer bg-white rounded-lg shadow-lg border-4 hover:shadow-xl transition-shadow mb-4"
                onClick={() => getsalespage(item.id)}
              >
                <h3 className="text-xl font-semibold text-blue-700">
                  {item.fileName}
                </h3>
              </div>
            ))
          ) : (
            <p>No sales data available.</p>
          )
        )}
      </div>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default MySales;
