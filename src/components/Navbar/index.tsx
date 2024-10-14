import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const {logout}  = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout = () => {
    logout();
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
