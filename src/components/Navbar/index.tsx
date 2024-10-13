import React, { useState } from 'react';
import Sidebar from '../Sidebar';

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar-container">
        <button className="navbar-button" onClick={()=> null}>
          Cerrar sesion
        </button>
       
      </nav>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Navbar;
