import React, {
    useEffect,
    useState,
    Suspense,
} from "react";
import DeleteModel from "../models/Delete";
import { deleteItem, fetchPaginatedData } from "../helper/Apis";
import { PlusButton } from "../helper/helperComponent";
import CategoryTable from "../components/CategoryTable";
import { CategoryModel } from "../models/Model";


const Category = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updatedata, setupdatedata] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });


    const fetchCategories = (page = pagination.page || 1, limit = pagination?.limit || 1) => {
        console.log(page,limit)
        fetchPaginatedData(
            "users/category/pagination",
            setCategory,
            setLoading,
            setPagination,
            { page, limit, body: { search }, }
        );
    };

   

    useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                fetchCategories(1, pagination.limit);
            }, 500); 
        
            return () => clearTimeout(delayDebounceFn);
        }, [search, pagination.limit]);

    const handleEditClick = (data) => {
        const { createdAt, id, updatedAt, isActive, ...otherData } = data;
        setupdatedata(otherData);
        setModalOpen(true);
    };



    const handleDelete = async (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        console.log(pagination)
        await deleteItem("users/category", deleteItemId,setLoading);
        setDeleteItemId(null);
        setDeleteModalOpen(false);
    fetchCategories(pagination.page, pagination.limit);

    };



    const handlePageClick = (pagination) => {
        const selectedPage = pagination.selected + 1;  
        fetchCategories(selectedPage, pagination.page);  
    };
    
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };


    return (
        <>
            <div className="container-fluid">
                <div
                    className="page-header mt-1"
                    style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 className="text-dark">Category</h3>
                </div>

                <div
                    className="d-flex justify-content-between mb-2"
                    style={{ background: "#fff", padding: "10px", marginTop: "20px" }}
                >
                    <select
                        className="form-control form-control-md w-auto"
                        value={pagination?.limit}
                        onChange={(e) => {
                            setPagination((prev) => ({
                                ...prev,
                                limit: Number(e.target.value),
                                page: 1, 
                            }));
                        }}
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

               
                <CategoryTable
                    loading={loading}
                    category={category}
                    currentPage={pagination.page}
                    perPage={pagination.limit}
                    totalPages={pagination.totalPages}
                    handlePageClick={handlePageClick}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                />
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                {modalOpen && (
                    <CategoryModel
                        modalOpen={modalOpen}
                        toggleModal={toggleModal}
                        setupdatedata={setupdatedata}
                        updatedata={updatedata}
                        fetchcategory={fetchCategories}
                        userId="1"
                    />
                )}
            </Suspense>

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

export default Category;
