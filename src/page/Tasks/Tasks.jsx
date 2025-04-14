import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    lazy,
    Suspense,
} from "react";
import DeleteModel from "../../models/Delete";
import { axiosInstance, deleteItem, fetchAllData, fetchPaginatedData } from "../../helper/Apis";
import { PlusButton } from "../../helper/helperComponent";
import TaskdataTable from "./TaskTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const data=[
    {category:"Categoy",title:"Daily Task 1",status:"pending",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Prcessing",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Completed",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"pending",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Prcessing",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Completed",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"pending",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Prcessing",tags:["user1","user2","user3","user4","user5"]},
    {category:"Categoy",title:"Daily Task 1",status:"Completed",tags:["user1","user2","user3","user4","user5"]},
    
]
const BASE_URL=process.env.REACT_APP_API_BASE_URL
const Tasks = () => {
    const navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    const [taskdata, setTaskdata] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const [pagination, setPagination] = useState({
           total: 0,
           page: 1,
           limit: 10,
           totalPages: 1,
       });

   const fetchTask = (page = pagination.page || 1, limit = pagination?.limit || 1,sortOrder, sortColumn) => {
          fetchPaginatedData(
              "users/task/pagination",
              setTaskdata,
              setLoading,
              setPagination,
              { page, limit, body: { search,sortColumn:sortOrder,sortOrder:sortColumn }, }
          );
      };


      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchTask(1, perPage);
        }, 500); 
    
        return () => clearTimeout(delayDebounceFn);
    }, [search, perPage]);
    

    const handleEditClick = (data) => {
       navigate("/user/add-task",{state:data})
    };



    const handleDelete = async (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        await deleteItem("users/task", deleteItemId,setLoading);
        setDeleteItemId(null);
        setDeleteModalOpen(false);
        fetchTask(pagination.page, pagination.limit);
    };


    const handlePageClick = (pagination) => {
        const selectedPage = pagination.selected + 1;  
        fetchTask(selectedPage, pagination.page);  
    };
    
    const toggleModal = () => {
        navigate("/user/add-task")
    };

    const handleStatusToggle=async(id, status)=>{
      try{
        const data={ id,status}
       const response=await axiosInstance.post(`${BASE_URL}users/task/status`, data)
       if(response.status==200){
        toast.success(response.data.message )
        fetchTask(1, pagination.limit,);
       }

      }catch(error){
        return error.response.data.message
      }
    }


    return (
        <>
            <div className="container-fluid">
                <div
                    className="page-header mt-1"
                    style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 className="text-dark">Tasks</h3>
                </div>

                <div
                    className="d-flex justify-content-between mb-2"
                    style={{ background: "#fff", padding: "10px", marginTop: "20px" }}
                >
                    <select
                        className="form-control form-control-md w-auto"
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        {[1,5, 10, 20, 50, 100, 150].map((limit) => (
                            <option key={limit} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </select>

                    <div style={{ display: "flex", gap: "20px" }}>
                        <div className="search-box">
                            <button className="btn-search">
                                <i className="fas fa-search"></i>
                            </button>
                            <input
                                type="text"
                                className="input-search"
                                placeholder="Type to Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <PlusButton handleAdd={toggleModal} />
                    </div>
                </div>

                <TaskdataTable
                    currentPage={pagination.page}
                    perPage={pagination.limit}
                    totalPages={pagination.totalPages}
                    handlePageClick={handlePageClick}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                    loading={loading}
                    taskdata={taskdata}
                    setTaskdata={setTaskdata}
                    totalCount={totalCount}
                    fetchData={fetchTask}
                    handleStatusToggle={handleStatusToggle}
                />
            </div>

            
            <Suspense fallback={<div>Loading...</div>}>
                <DeleteModel
                    deleteModalOpen={deleteModalOpen}
                    setDeleteModalOpen={() => setDeleteModalOpen(!deleteModalOpen)}
                    onConfirm={confirmDelete}
                    itemName="currency"
                />
            </Suspense>
        </>
    );
};

export default Tasks;
