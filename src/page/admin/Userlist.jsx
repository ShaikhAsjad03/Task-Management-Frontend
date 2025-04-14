import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { fetchPaginatedData } from "../../helper/Apis";
import UserListTable from "./UserListTable";

const UserList = () => {
    const location = useLocation();
    const category = location.state;

    const [loading, setLoading] = useState(true);
    const [userdata, setUserdata] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });



    const fetchUserlistData = (page, limit) => {
        fetchPaginatedData(
            `admin/users-list`,
            setUserdata,
            setLoading,
            (newPagination) => {
                setPagination({
                    ...newPagination,
                    page,
                    limit,
                });
            },
            {
                page,
                limit,
                body: { search, categoryId: category?._id },
                tokenType: "admin",
            }
        );
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchUserlistData(1, pagination.limit);
        }, 500);

        return () => clearTimeout(debounce);
    }, [search]);

    useEffect(() => {
        fetchUserlistData(1, pagination.limit);
    }, [pagination.limit]);

   
   

   

    const handlePageClick = (paginationData) => {
        const selectedPage = paginationData.selected + 1;
        fetchUserlistData(selectedPage, pagination.limit);
    };


    return (
        <div className="container-fluid">
            <div className="page-header mt-1 d-flex justify-content-between">
                <h4 className="text-dark">User</h4>
            </div>

            <div
                className="d-flex justify-content-between mb-2"
                style={{ background: "#fff", padding: "10px", marginTop: "20px" }}
            >
                <select
                    className="form-control form-control-md w-auto"
                    value={pagination.limit}
                    onChange={(e) =>
                        setPagination((prev) => ({
                            ...prev,
                            limit: Number(e.target.value),
                            page: 1,
                        }))
                    }
                >
                    {[5, 10, 20, 50, 100].map((limit) => (
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

                </div>
            </div>


            <UserListTable
                loading={loading}
                userdata={userdata}
                currentPage={pagination.page}
                perPage={pagination.limit}
                totalPages={pagination.totalPages}
                handlePageClick={handlePageClick}
            />
        </div>
    );
};

export default UserList;
