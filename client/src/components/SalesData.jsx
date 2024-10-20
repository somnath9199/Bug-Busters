import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts'; // Import Google Charts
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const SalesData = () => {
  const { id } = useParams();
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.post(`/api/v1/getsalesdata/${id}`);
        if (response.data && response.data['Sales data ']) {
          setSalesData(response.data['Sales data ']);
        } else {
          setError('No Data Found!');
        }
      } catch (err) {
        setError('Error fetching sales data!');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [id]);

  if (loading) {
    return <Loader />   
    
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">{error}</div>;
  }

  const { totalRevenue, totalCost, profit, loss, marginPercentage, uniqueProductPrices } = salesData;

  // Prepare data for the Google Charts
  const productLabels = Object.keys(uniqueProductPrices);
  const productCounts = Object.values(uniqueProductPrices).map(item => item.count);
  const productPrices = Object.values(uniqueProductPrices).map(item => item.price);

  // Format data for Google Charts
  const chartData = [
    ['Product', 'Product Counts'],
    ...productLabels.map((label, index) => [label, productCounts[index]]),
  ];

  const options = {
    title: 'Sales Analytics',
    hAxis: { title: 'Product' },
    vAxes: {
      0: { title: 'Counts', minValue: 0 },
      
    },
    series: {
      0: { targetAxisIndex: 0, color: '#4caf50' }, // Product Counts
     
    },
    isStacked: true,
  };

  return (
    <div className="h-screen flex">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Sales Data Overview</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">New Report</button>
        </header>

        {/* Cards Section for Key Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-blue-100 p-6 rounded-lg shadow-md border border-blue-200">
    <h2 className="text-lg font-semibold mb-2 text-blue-800">Total Revenue</h2>
    <p className="text-4xl font-bold text-blue-900">${totalRevenue.toFixed(2)}</p>
    <p className="text-blue-600">+8% since last month</p>
  </div>

  <div className="bg-green-100 p-6 rounded-lg shadow-md border border-green-200">
    <h2 className="text-lg font-semibold mb-2 text-green-800">Profit</h2>
    <p className="text-4xl font-bold text-green-900">${profit.toFixed(2)}</p>
    <p className="text-green-600">+3% since last week</p>
  </div>

  <div className="bg-red-100 p-6 rounded-lg shadow-md border border-red-200">
    <h2 className="text-lg font-semibold mb-2 text-red-800">Loss</h2>
    <p className="text-4xl font-bold text-red-900">${loss.toFixed(2)}</p>
    <p className="text-red-600">+0% since last month</p>
  </div>

  <div className="bg-yellow-100 p-6 rounded-lg shadow-md border border-yellow-200">
    <h2 className="text-lg font-semibold mb-2 text-yellow-800">Margin Percentage</h2>
    <p className="text-4xl font-bold text-yellow-900">{marginPercentage}%</p>
    <p className="text-yellow-600">+2% since last month</p>
  </div>
</div>


        {/* Charts Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <div className="h-[90vh]">
            <Chart
              chartType="Bar"
              data={chartData}
              options={options}
              width="100%"
              height="100%"
            />
          </div>
        </div>

        {/* Sales Data Table */}
        <h1 className="text-2xl font-bold mb-4 mt-6">Sales Transactions</h1>
        {salesData.salesData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity Ordered</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price Each</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Margin</th>
              </tr>
            </thead>
            <tbody>
              {salesData.salesData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{item.orderId}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.product}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantityOrdered}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.priceEach.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.Margin.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg font-medium">No sales data available</p>
        )}
      </div>
    </div>
  );
};

export default SalesData;
