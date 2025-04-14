import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAllAuthData } from '../../helper/ImageLink';

const AvatarDropdown = () => {
    const navigate=useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const getPayload = (type = "user") => {
    if (type === "admin") {
      return JSON.parse(localStorage.getItem("adminpayload"))
    }
    return JSON.parse(localStorage.getItem("userpayload"))
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout=()=>{
    clearAllAuthData()
    return navigate("/")
  }
  return (
    <div className="d-flex justify-content-end" style={{ position: 'relative', zIndex: 1000 }} ref={dropdownRef}>
      <div className="dropdown" style={{ position: 'relative' }}>
        <button
          className="btn p-0 border-0 bg-transparent d-flex align-items-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmRmnJN2pnZPdn6S_fV8JjZCmkPfdrwCn7LlgkfFoiZJQqhm12J-oFxEpGy_WZv44dM0&usqp=CAU"
            alt="avatar"
            className="profile-img shadow"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          />
        </button>

        {showDropdown && (
          <ul
            className="dropdown-menu dropdown-menu-end show shadow rounded"
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '10px',
              zIndex: 9999,
              minWidth: '220px',
              padding: '0.5rem 0',
              border: '1px solid #e0e0e0',
            }}
          >
            <li className="px-3 py-2 border-bottom text-center">
              <strong style={{ display: 'block', fontSize: '1rem' }}>{getPayload()?.name}</strong>
              <small className="text-muted">{getPayload()?.email}</small>
            </li>
            <li>
              <Link className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" to={`profile`}>
                <i className="fa-solid fa-user text-primary"></i>
                <span style={{ marginLeft: "10px" }}>Profile</span>
              </Link>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 text-danger bg-transparent border-0 w-100 text-start"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span style={{ marginLeft: "10px" }}>Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvatarDropdown;
