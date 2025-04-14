// import React from "react";
// import { Link } from "react-router-dom";

// const Header = ({ toggleSidebar }) => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-light px-4" style={{minHeight:"80px"}}>
//       <button className="btn btn-outline-dark me-3" onClick={toggleSidebar}>
//         ☰
//       </button>

//       <Link className="navbar-brand text-dark" to="/home" >TASK</Link>

//       <div className="collapse navbar-collapse ">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item "><Link className="nav-link text-dark" to="/home">Home</Link></li>
//           <li className="nav-item"><Link className="nav-link text-dark" to="/features">Features</Link></li>
//           <li className="nav-item"><Link className="nav-link text-dark" to="/contact">Contact</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Header;


import React from "react";
import "./Header.css"
import AvatarDropdown from "./AvatarDropdown";
function Header({ toggleSidebar ,isSidebarOpen}) {
  return (
    <nav className={`header ${isSidebarOpen ? 'headerhalf' : ''}`}>
      <button className="btn btn-outline-primary me-3" onClick={toggleSidebar}>
      <i class="fa-solid fa-bars" style={{color:"#333"}}></i>
      </button>
      <span className="navbar-brand mb-0 h1">Dashboard</span>
      <div className="ms-auto d-flex align-items-center">
        <span className="me-3">Welcome, Admin</span>
        {/* <button className="btn btn-outline-danger btn-sm">Logout</button> */}
        <AvatarDropdown/>
      </div>
    </nav>
  );
}

export default Header;

