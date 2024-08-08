// components/Dashboard.js

import React from 'react';
import NavBar from './navbar/NavBar';

const Dashboard = ({ isAdmin,isLoggedIn,handleLogout }) => {
  return (
    <div >


        <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout}/>


      {isAdmin ? (
        <h1 className="text-3xl font-bold text-center text-green-600">Hello world admin</h1>
      ) : (
        <h1 className="text-3xl font-bold text-center text-blue-600">Hello world employee</h1>
      )}



      {/* Add more dashboard content here based on requirements */}
    </div>
  );
};

export default Dashboard;
