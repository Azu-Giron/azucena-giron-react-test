import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [openProductSubmenu, setOpenProductSubmenu] = useState(false);

  const toggleProductSubmenu = () => {
    setOpenProductSubmenu(!openProductSubmenu);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "sidebar-open" : ''}`}>
      <button className="sidebar-closeButton" onClick={toggleSidebar}>
        <FaBars className="sidebar-icon"/>
      </button>
      <ul className="sidebar-Links">
        <li>
          <button className="sidebar-menu-item" onClick={toggleProductSubmenu}>
            Productos
          </button>

          {openProductSubmenu && (
            <ul className="sidebar-submenu">
              <li><a href="#/products">Ver</a></li>
              <li><a href="#/products/create">Crear</a></li>
            </ul>
          )}
        </li>
        <li>
          <button className="sidebar-menu-item" onClick={() => navigate('/products')}>
            usuarios
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
