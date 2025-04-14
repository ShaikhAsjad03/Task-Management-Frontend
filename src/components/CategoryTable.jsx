import React from "react";
import { ActionButton } from "../helper/helperComponent";
import Spinner from "../helper/Spinner";
import ReactPaginate from "react-paginate";
import { formatDate } from "../helper/ImageLink";
const CategoryTable = ({
    loading,
    category,
    currentPage,
    perPage,
    totalPages,
    handleEditClick,
    handleDelete,
    handleStatusToggle,
    handlePageClick,
    
 
}) => {
    return (
        <div className="row ">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className=" custom-table table table-striped" id="myTable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Task</th>
                                        <th>Created Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="12" className="text-center">
                                                <Spinner />
                                            </td>
                                        </tr>
                                    ) :category&& category?.length > 0 ? (
                                        category?.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>{item.name}</td>
                                                <td className="text-left">
                                                                                <button
                                                                                    type="button"
                                                                                  className="count-button1"
                                                                                >
                                                                                    {item.taskCount || 0}
                                                                                </button>
                                                                            </td>

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
        </div>
    );
};

export default CategoryTable;
