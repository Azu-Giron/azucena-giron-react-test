import React, { useState } from 'react';
import Sidebar from '../Sidebar';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const {logOut}  = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout = () => {
    logOut();
    navigate('/');
  };
  return (
    <>
      <nav className="navbar-container">
        <button className="navbar-button" onClick={()=> handleLogout()}>
          Cerrar sesion
        </button>
       
      </nav>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Navbar;
