import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Component imports
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leads from './components/leads/Leads';
import LeadForm from './components/leads/LeadForm';
import LeadDetail from './components/leads/LeadDetail';
import CreateUserForm from './components/users/CreateUserForm'; // Import the CreateUserForm component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state, change as per actual login logic
  const [isAdmin, setIsAdmin] = useState(false); // Example state, change as per actual login logic

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', { username, password });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIsAdmin(response.data.is_admin);  // Assuming backend sends 'is_admin' in response
        return { success: true };
      } else {
        setIsLoggedIn(true);//navy-remove later bypassing login
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggedIn(true);//navy-remove later bypassing login
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);  // Reset isAdmin state on logout
  };
 

  return (
    <Router>
      <div>
        {/* Navbar can be added here if needed */}
        
        <Routes>
          <Route path="/" element={isLoggedIn 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
          } />

          <Route path="/dashboard" element={isLoggedIn
            ? <Dashboard isAdmin={isAdmin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          <Route path="/leads" element={isLoggedIn
            ? <Leads isAdmin={isAdmin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          <Route path="/leads/new" element={isLoggedIn
            ? <LeadForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          <Route path="/leads/:id/edit" element={isLoggedIn
            ? <LeadForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          <Route path="/leads/:id" element={isLoggedIn
            ? <LeadDetail isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          {/* Route for creating users */}
          <Route path="/users/create" element={isLoggedIn && isAdmin  // Only allow admin to create users
            ? <CreateUserForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
          } />

          <Route path="/login" element={!isLoggedIn
            ? <Login onLogin={handleLogin} />
            : <Navigate to="/" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
