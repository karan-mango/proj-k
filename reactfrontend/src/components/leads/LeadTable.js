// components/LeadsTable.js

import React from 'react';
import { Link } from 'react-router-dom';

const LeadsTable = ({ leads, sortLeads, handleDelete, navigate }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">List of Leads:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-200">S.No</th>
              <th
                className="py-2 px-4 border-b border-gray-200 bg-gray-200 cursor-pointer"
                onClick={() => sortLeads('name')}
              >
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-200">Phone</th>
              <th
                className="py-2 px-4 border-b border-gray-200 bg-gray-200 cursor-pointer"
                onClick={() => sortLeads('status')}
              >
                Status
              </th>
              <th
                className="py-2 px-4 border-b border-gray-200 bg-gray-200 cursor-pointer"
                onClick={() => sortLeads('created_at')}
              >
                Created At
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={lead.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <p className="text-lg font-semibold text-blue-600">
                    <Link to={`/leads/${lead.id}`}>{lead.name}</Link>
                  </p>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{lead.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{lead.phone_number}</td>
                <td className="py-2 px-4 border-b border-gray-200">{lead.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(lead.created_at).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/leads/${lead.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(lead.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
