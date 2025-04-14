import React, { useEffect, useState } from "react";
import { fetchAllData } from "../helper/Apis";
import Spinner from "../helper/Spinner";
import { ImageLink } from "../helper/ImageLink";
import { RedirectButton } from "../helper/helperComponent";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
   const navigate=useNavigate()
    const [dasboarddata,setDashboardData]=useState({})
      const [loading,setLoading]=useState(true)

    useEffect(() => {
        fetchAllData("users/dashboard", setDashboardData, setLoading);
          }, [])


          
          const handleCategory=()=>{
            navigate("/user/category")
          }

          const handlelateslatestTask=()=>{
            navigate("/user/task")
          }

  return (
    <div className="container-fluid">
<div className="row g-4 mb-4 custom">
  <div className="col-md-4 col-sm-12">
    <div className="card shadow-sm border-0 px-3 py-4 d-flex flex-row justify-content-between align-items-center animate__animated animate__fadeInUp rounded-4 card-custom">
      <div className="ellipse-bg d-flex align-items-center justify-content-center me-3 bg-primary-subtle">
        <i className="fas fa-tasks fa-2x text-primary"></i>
      </div>
      <div className="text-end pe-2">
        <h6 className="text-muted mb-1">Total Tasks</h6>
        <h3 className="fw-bold text-dark mb-0">{dasboarddata?.totalTasks || 0}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4 col-sm-12">
    <div className="card shadow-sm border-0  px-3 py-4  d-flex flex-row justify-content-between align-items-center animate__animated animate__fadeInUp animate__delay-1s rounded-4 card-custom">
      <div className="ellipse-bg d-flex align-items-center justify-content-center me-3 bg-warning-subtle">
        <i className="fas fa-hourglass-half fa-2x text-warning"></i>
      </div>
      <div className="text-end pe-2">
        <h6 className="text-muted mb-1">Pending Tasks</h6>
        <h3 className="fw-bold text-dark mb-0">{dasboarddata?.pendingTasks || 0}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4 col-sm-12">
    <div className="card shadow-sm border-0  px-3 py-4  d-flex flex-row justify-content-between align-items-center animate__animated animate__fadeInUp animate__delay-2s rounded-4 card-custom">
      <div className="ellipse-bg d-flex align-items-center justify-content-center me-3 bg-success-subtle">
        <i className="fas fa-check-circle fa-2x text-success"></i>
      </div>
      <div className="text-end pe-2">
        <h6 className="text-muted mb-1">Completed Tasks</h6>
        <h3 className="fw-bold text-dark mb-0">{dasboarddata?.completedTasks || 0}</h3>
      </div>
    </div>
  </div>
</div>




      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 p-3">
      <h5 className="mb-0 fw-semibold" style={{color:"#198754"}}>Latest Category</h5>
    </div>
            <div className="card-body">
              <table className="custom-table table table-striped">
                <thead>
                  <tr>
                  <th style={{paddingLeft:"20px"}}>#</th>
                    <th>Name</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
  {loading ? (
    <tr>
      <td colSpan="6" className="text-center">
        <Spinner />
      </td>
    </tr>
  ) : dasboarddata?.latestCategories?.length > 0 ? (
    dasboarddata.latestCategories.map((cat,index) => (
      <tr key={cat._id || cat.id}>
      <td style={{paddingLeft:"20px"}}>{index+1}</td>
        <td>{cat.name}</td>
        <td>
                 <RedirectButton handleEditClick={handleCategory}/>
                </td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center">
        <h5 className="text-muted">No data available</h5>
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
  <div className="card shadow-sm border-0 ">
    <div className="card-header bg-white border-bottom-0 p-3">
      <h5 className="mb-0 fw-semibold" style={{color:"#198754"}}>Latest Tasks</h5>
    </div>
    <div className="card-body">
      <table className="custom-table table table-striped">
        <thead className="table-light">
          <tr>
            <th style={{paddingLeft:"20px"}}>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <Spinner />
              </td>
            </tr>
          ) : dasboarddata?.latestTasks?.length > 0 ? (
            dasboarddata.latestTasks.map((task, index) => (
              <tr key={task._id || task.id}>
                <td style={{paddingLeft:"20px"}}>{index + 1}</td>
                <td>
                  <img
                    src={ImageLink(task?.image)}
                    alt="task"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      borderRadius:"10px"
                    }}
                  />
                </td>
                <td>{task.title}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      task.status === "completed"
                        ? "bg-success"
                        : task.status === "processing"
                        ? "bg-info text-dark"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </td>
                <td>
                 <RedirectButton handleEditClick={handlelateslatestTask}/>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <h6 className="text-muted mb-0">No tasks available</h6>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default UserDashboard;
