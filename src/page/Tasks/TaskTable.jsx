import React, { useState, useEffect } from "react";
import { ActionButton } from "../../helper/helperComponent";
import Spinner from "../../helper/Spinner";
import { Badge } from "reactstrap";
import { formatDate, ImageLink } from "../../helper/ImageLink";
import ReactPaginate from "react-paginate";

const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
        case "pending":
            return <Badge color="warning">Pending</Badge>;
        case "processing":
            return <Badge color="info">Processing</Badge>;
        case "completed":
            return <Badge color="success">Completed</Badge>;
        default:
            return <Badge color="secondary">Unknown</Badge>;
    }
};

const TaskdataTable = ({
    loading,
    taskdata,
    currentPage,
    perPage,
    handleEditClick,
    handleDelete,
    handleStatusToggle,
    fetchData, 
    handlePageClick,
    totalPages
    
}) => {
    const [sortColumn, setSortColumn] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        fetchData(currentPage, perPage, sortColumn, sortOrder);
    }, [sortColumn, sortOrder, currentPage, perPage]);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const renderSortIcon = (column) => {
        if (sortColumn === column) {
            return sortOrder === "asc" ? (
                <i className="fa fa-sort-up ms-1"></i>
            ) : (
                <i className="fa fa-sort-down ms-1"></i>
            );
        }
        return <i className="fa fa-sort ms-1"></i>;
    };

    const handleStatusChange = (id, newStatus) => {
        if (handleStatusToggle) {
            handleStatusToggle(id, newStatus);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="custom-table table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                                            # {renderSortIcon("id")}
                                        </th>
                                        <th>Image</th>
                                        <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                                            Title {renderSortIcon("title")}
                                        </th>
                                        <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                                            Category {renderSortIcon("category")}
                                        </th>
                                        <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                                            Status {renderSortIcon("status")}
                                        </th>
                                        <th >
                                            Deadline 
                                        </th>
                                        <th >
                                            Created Date
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <Spinner />
                                            </td>
                                        </tr>
                                    ) : taskdata && taskdata.length > 0 ? (
                                        taskdata.map((item, index) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>
                                                    <img src={ImageLink(item?.image)}
                                                        style={{
                                                            height:"60px",
                                                            width:"60px",
                                                            borderRadius:"10%"
                                                        }}
                                                    />
                                                </td>
                                                <td>{item?.title}</td>
                                                <td>{item?.category?.name || "N/A"}</td>
                                                <td>
                                                    {getStatusBadge(item?.status)}
                                                    <select
                                                        className="form-select mt-1"
                                                        value={item.status.toLowerCase()}
                                                        onChange={(e) =>
                                                            handleStatusChange(item?._id, e.target.value)
                                                        }
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </td>
                                                <td>{formatDate(item.deadline)}</td>
                                                <td>{formatDate(item.createdAt)}</td>

                                                <td>
                                                    <ActionButton
                                                        data={item}
                                                        handleEditClick={handleEditClick}
                                                        handleDelete={handleDelete}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="text-center">
                                                <h4 className="text-muted mb-0">No data available</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                <div className="d-flex justify-content-end me-5">
                <ReactPaginate
    breakLabel="..."
    nextLabel="Next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={3}
    marginPagesDisplayed={2}  
    pageCount={totalPages}
    previousLabel="< Prev"
    containerClassName="pagination justify-content-center"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
    breakClassName="page-item"
    breakLinkClassName="page-link"
    activeClassName="active"
/>
                </div>


                </div>
            </div>
        </div>
    );
};

export default TaskdataTable;
