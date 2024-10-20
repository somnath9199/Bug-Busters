import React, { useState } from "react";

const BalanceSheet = () => {
  const [currentAssets, setCurrentAssets] = useState([{ name: "", amount: "" }]);
  const [fixedAssets, setFixedAssets] = useState([{ name: "", amount: "" }]);
  const [currentLiabilities, setCurrentLiabilities] = useState([{ name: "", amount: "" }]);
  const [longTermLiabilities, setLongTermLiabilities] = useState([{ name: "", amount: "" }]);

  // Handle input change for current assets
  const handleCurrentAssetChange = (index, event) => {
    const newAssets = [...currentAssets];
    newAssets[index][event.target.name] = event.target.value;
    setCurrentAssets(newAssets);
  };

  // Handle input change for fixed assets
  const handleFixedAssetChange = (index, event) => {
    const newAssets = [...fixedAssets];
    newAssets[index][event.target.name] = event.target.value;
    setFixedAssets(newAssets);
  };

  // Handle input change for current liabilities
  const handleCurrentLiabilityChange = (index, event) => {
    const newLiabilities = [...currentLiabilities];
    newLiabilities[index][event.target.name] = event.target.value;
    setCurrentLiabilities(newLiabilities);
  };

  // Handle input change for long-term liabilities
  const handleLongTermLiabilityChange = (index, event) => {
    const newLiabilities = [...longTermLiabilities];
    newLiabilities[index][event.target.name] = event.target.value;
    setLongTermLiabilities(newLiabilities);
  };

  // Add a new current asset field
  const addCurrentAssetField = () => {
    if (currentAssets.some(asset => !asset.name || !asset.amount)) return;
    setCurrentAssets([...currentAssets, { name: "", amount: "" }]);
  };

  // Add a new fixed asset field
  const addFixedAssetField = () => {
    if (fixedAssets.some(asset => !asset.name || !asset.amount)) return;
    setFixedAssets([...fixedAssets, { name: "", amount: "" }]);
  };

  // Add a new current liability field
  const addCurrentLiabilityField = () => {
    if (currentLiabilities.some(liability => !liability.name || !liability.amount)) return;
    setCurrentLiabilities([...currentLiabilities, { name: "", amount: "" }]);
  };

  // Add a new long-term liability field
  const addLongTermLiabilityField = () => {
    if (longTermLiabilities.some(liability => !liability.name || !liability.amount)) return;
    setLongTermLiabilities([...longTermLiabilities, { name: "", amount: "" }]);
  };

  // Calculate total
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
  };

  const totalCurrentAssets = calculateTotal(currentAssets);
  const totalFixedAssets = calculateTotal(fixedAssets);
  const totalAssets = totalCurrentAssets + totalFixedAssets;
  const totalCurrentLiabilities = calculateTotal(currentLiabilities);
  const totalLongTermLiabilities = calculateTotal(longTermLiabilities);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Balance Sheet Generator</h1>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between mb-6">
          {/* Assets Section */}
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assets</h2>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Current Assets</h3>
            {currentAssets.map((asset, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={asset.name}
                  onChange={(event) => handleCurrentAssetChange(index, event)}
                  placeholder="Asset Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="number"
                  name="amount"
                  value={asset.amount}
                  onChange={(event) => handleCurrentAssetChange(index, event)}
                  placeholder="Amount"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}
            <button
              onClick={addCurrentAssetField}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add Current Asset
            </button>

            <h3 className="text-lg font-semibold text-gray-600 mt-6 mb-2">Fixed Assets</h3>
            {fixedAssets.map((asset, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={asset.name}
                  onChange={(event) => handleFixedAssetChange(index, event)}
                  placeholder="Asset Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="number"
                  name="amount"
                  value={asset.amount}
                  onChange={(event) => handleFixedAssetChange(index, event)}
                  placeholder="Amount"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}
            <button
              onClick={addFixedAssetField}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Fixed Asset
            </button>
          </div>

          {/* Liabilities Section */}
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Liabilities</h2>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Current Liabilities</h3>
            {currentLiabilities.map((liability, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={liability.name}
                  onChange={(event) => handleCurrentLiabilityChange(index, event)}
                  placeholder="Liability Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="number"
                  name="amount"
                  value={liability.amount}
                  onChange={(event) => handleCurrentLiabilityChange(index, event)}
                  placeholder="Amount"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}
            <button
              onClick={addCurrentLiabilityField}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Add Current Liability
            </button>

            <h3 className="text-lg font-semibold text-gray-600 mt-6 mb-2">Long-term Liabilities</h3>
            {longTermLiabilities.map((liability, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={liability.name}
                  onChange={(event) => handleLongTermLiabilityChange(index, event)}
                  placeholder="Liability Name"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="number"
                  name="amount"
                  value={liability.amount}
                  onChange={(event) => handleLongTermLiabilityChange(index, event)}
                  placeholder="Amount"
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}
            <button
              onClick={addLongTermLiabilityField}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
            >
              Add Long-term Liability
            </button>
          </div>
        </div>

        {/* Totals Section */}
        <div className="mt-8 border-t pt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Totals</h2>
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Total Current Assets:</h3>
              <p className="text-xl font-bold text-gray-800">{totalCurrentAssets.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Total Fixed Assets:</h3>
              <p className="text-xl font-bold text-gray-800">{totalFixedAssets.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Total Current Liabilities:</h3>
              <p className="text-xl font-bold text-gray-800">{totalCurrentLiabilities.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Total Long-term Liabilities:</h3>
              <p className="text-xl font-bold text-gray-800">{totalLongTermLiabilities.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-600">Net Worth:</h3>
            <p className="text-2xl font-bold text-gray-800">{netWorth.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
