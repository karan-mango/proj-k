import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar/NavBar';
import LeadsTable from '../leads/LeadTable'; // Import the new LeadsTable component

const Leads = ({ isLoggedIn, handleLogout }) => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchLeads(); // Fetch all leads if search term is empty
      } else {
        searchLeads(); // Perform search if search term is not empty
      }
    }, 300); // Debounce time set to 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:8000/leads/');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const searchLeads = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/leads/search/?search=${encodeURIComponent(searchTerm)}`);
      setLeads(response.data);
    } catch (error) {
      console.error('Error searching leads:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/leads/${id}/`);
      alert('Lead deleted successfully!');
      fetchLeads(); // Refresh leads after deletion
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortLeads = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedLeads = [...leads].sort((a, b) => {
      if (key === 'created_at') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else if (key === 'status') {
        const statusOrder = ['New', 'Contacted', 'Converted', 'Lost'];
        return direction === 'asc'
          ? statusOrder.indexOf(a[key]) - statusOrder.indexOf(b[key])
          : statusOrder.indexOf(b[key]) - statusOrder.indexOf(a[key]);
      } else {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setLeads(sortedLeads);
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-purple-600">Leads Page</h1>

        <div className="flex justify-between items-center mt-8">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            onClick={() => navigate('/leads/new')}
          >
            Add New Lead
          </button>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleChange}
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <LeadsTable
          leads={leads}
          sortLeads={sortLeads}
          handleDelete={handleDelete}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Leads;
