import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/v1/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success('Login Successfully!');
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 4000);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/002/107/858/original/income-tax-calculation-concept-vector.jpg')` }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-red-400 bg-opacity-70 p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-center text-xl font-bold text-gray-800">Login</h2>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Login
          </button>
          {errorMessage && <p className="text-white-600 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
