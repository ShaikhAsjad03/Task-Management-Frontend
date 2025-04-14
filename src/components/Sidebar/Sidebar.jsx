import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; 

function Sidebar({ isOpen, isMobile, onClose }) {
  return (
    <>
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div
        className={`sidebar ${isMobile ? "mobile-sidebar" : "desktop-sidebar"} ${isOpen ? "show" : "hide"}`}
      >
        <div className="sidebar-header">
          <img
            src="/logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "60px" }}
          />
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard">
              <span>Dashboard</span>  <i class="fa-solid fa-desktop"></i>

            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/userlist">
              <span>User</span><i class="fa-solid fa-user"></i>
            </NavLink>
          </li>


          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/in-activeUser">
              <span>Blocked User</span><i class="fa-solid fa-user-minus"></i>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/task">
              <span>Task</span> <i class="fa-solid fa-layer-group"></i>
            </NavLink>
          </li>

        </ul>
      </div>
    </>
  );
}


function UserSidebar({ isOpen, isMobile, onClose }) {
  return (
    <>
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div
        className={`sidebar ${isMobile ? "mobile-sidebar" : "desktop-sidebar"} ${isOpen ? "show" : "hide"}`}
      >
        <div className="sidebar-header">
          <img
            src="/logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "60px" }}
          />
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/dashboard">
              <span>Dashboard</span> <i className="fa-solid fa-desktop"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/category">
              <span>Category</span> <i className="fa-solid fa-layer-group"></i>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/task">
              <span>Task</span> <i className="fa-solid fa-tasks"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export { UserSidebar};

export default Sidebar;
