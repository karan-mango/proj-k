import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <Link to="/" className="text-lg font-bold">Car Sales Management</Link>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/dashboard" currentPath={location.pathname}>
            Dashboard
          </NavLink>
          <NavLink to="/leads" currentPath={location.pathname}>
            Leads
          </NavLink>
          <NavLink to="/users/create" currentPath={location.pathname}>
  Create User
</NavLink>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`text-white ${isActive ? 'bg-yellow-500' : 'bg-gray-700 hover:bg-blue-600'} px-3 py-2 rounded`}
      disabled={isActive} // Disable the link if it's already active
    >
      {children}
    </Link>
  );
};

export default NavBar;
