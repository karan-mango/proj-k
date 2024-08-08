import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
const CreateUserForm = () => {
  const navigate = useNavigate();
  const initialState = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    is_admin: false,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create_user/', formData);
      alert('User created successfully!');
      setErrorMessage(''); // Clear any previous error messages on successful submission
      console.log(response.data); // Log the response data for reference
      setFormData({ ...initialState }); // Clear the form fields after successful submission
      navigate(`/dashboard/`);
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error case: email already exists
        if (error.response.data.email) {
          setErrorMessage(error.response.data.email[0]); // Display the specific email error message
        } else {
          console.error('Error:', error.message);
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    }
  };
  
  return (
    <>
    <NavBar/>
    
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center text-purple-600">Create User</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="first_name"
            type="text"
            name="first_name"
            placeholder="Enter first name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Enter last name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_admin">
            Is Admin?
          </label>
          <input
            className="mr-2 leading-tight"
            id="is_admin"
            type="checkbox"
            name="is_admin"
            checked={formData.is_admin}
            onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
    </>
    
  );
};

export default CreateUserForm;
