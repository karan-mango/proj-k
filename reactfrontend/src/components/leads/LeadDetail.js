// components/LeadDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar/NavBar';

const LeadDetail = ({ isLoggedIn, handleLogout }) => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/leads/${id}/`);
        setLead(response.data);
      } catch (error) {
        console.error('Error fetching lead details:', error);
      }
    };

    fetchLead();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/leads/${id}/`);
      alert('Lead deleted successfully!');
      navigate('/leads');
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };



  if (!lead) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar  isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-purple-600">Lead Details</h1>
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/leads')}
            >
              Back to Leads
            </button>
            <div>
              <Link
                to={`/leads/${lead.id}/edit`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={handleDelete}
              >
                Delete
              </button>
              
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Name: {lead.name}</h2>
            </div>
            <div className="mb-4">
              <p><strong>Email:</strong> {lead.email}</p>
            </div>
            <div className="mb-4">
              <p><strong>Phone:</strong> {lead.phone_number}</p>
            </div>
            <div className="mb-4">
              <p><strong>Status:</strong> {lead.status}</p>
            </div>
            <div className="mb-4">
              <p><strong>Created At:</strong> {new Date(lead.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
