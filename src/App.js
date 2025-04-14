import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar, { UserSidebar } from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Login from "./page/login";
import "./App.css";
import UserSignIn from "./page/UserSignIn";
import NotFound from "./page/NotFound";
import Category from "./page/Category";
import Tasks from "./page/Tasks/Tasks";
import AddTasks from "./page/Tasks/AddTasks";
import { ToastContainer } from "react-toastify";
import EditProfile from "./page/EditProfile";
import UserDashboard from "./page/UserDasboad";
import Footer from "./components/Footer";
import UserList from "./page/admin/Userlist";
import UserCategoryListAdmin from "./page/admin/UserCategoryList";
import CategoryTask from "./page/admin/CategoryTask";
import GetAllTask from "./page/admin/GetAllTask";
import AdminDashboard from "./page/admin/AdminDashboard";
import InActiveUser from "./page/admin/InActiveUser";

function RequireAuth({ children, allowedRole }) {
  const token = localStorage.getItem(`${allowedRole}AccessToken`);
  const payload = localStorage.getItem(`${allowedRole}payload`);

  if (!token || !payload) {
    return <Navigate to="/" />;
  }

  return children;
}



function RedirectIfAuthenticated({ children }) {
  const adminToken = localStorage.getItem("adminAccessToken");
  const userToken = localStorage.getItem("userAccessToken");

  if (adminToken) return <Navigate to="/admin/profile" />;
  if (userToken) return <Navigate to="/user/category" />;

  return children;
}



function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true); 
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layoutShifted = isSidebarOpen && isMobile ? "shifted" : "";

  return (
    <Router>
      <Routes>
      <Route path="/" element={ <RedirectIfAuthenticated><Login /> </RedirectIfAuthenticated>}/>
      <Route path="/sign" element={<RedirectIfAuthenticated>     <UserSignIn />   </RedirectIfAuthenticated> }  />
        <Route
          path="/admin/*"
          element={
            <RequireAuth allowedRole="admin">

              <div className="app-layout">
                  <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <div >
                <Sidebar 
                  isOpen={isSidebarOpen}
                  isMobile={isMobile}
                  onClose={toggleSidebar}


                />
                  <div className={`pages-content ${isSidebarOpen ? 'pages-content-open' : ''}`}>
                    <Routes>
                    <Route path="dashboard" element={<AdminDashboard/>} />
                    <Route path="userlist" element={<UserList/>} />
                    <Route path="user/category" element={<UserCategoryListAdmin/>} />
                    <Route path="categorywise/task" element={<CategoryTask/>} />
                    <Route path="task" element={<GetAllTask/>} />
                    <Route path="in-activeUser" element={<InActiveUser/>} />
                      <Route path="profile" element={<EditProfile/>} />
                      <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </RequireAuth>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/user/*"
          element={
            <RequireAuth allowedRole="user">
              <div className="app-layout">
                  <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
               
                <div >
                <UserSidebar 
                  isOpen={isSidebarOpen}
                  isMobile={isMobile}
                  onClose={toggleSidebar}


                />
                  <div className={`pages-content ${isSidebarOpen ? 'pages-content-open' : ''}`}>
                    <Routes>
                    <Route path="dashboard" element={<UserDashboard />} />
                      <Route path="category" element={<Category/>} />
                      <Route path="task" element={<Tasks/>} />
                      <Route path="profile" element={<EditProfile/>} />
                      <Route path="add-task" element={<AddTasks/>} />
                      <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                  </div>
                </div>
                <Footer/>
              </div>
            </RequireAuth>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;
