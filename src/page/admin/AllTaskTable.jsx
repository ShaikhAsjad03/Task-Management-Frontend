import React from "react";
import { ActionButton } from "../../helper/helperComponent";
import Spinner from "../../helper/Spinner";
import ReactPaginate from "react-paginate";
import { formatDate, ImageLink } from "../../helper/ImageLink";
const AllTaskTable = ({
    loading,
    alltask,
    currentPage,
    perPage,
    totalPages,
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
                                        <th>Image</th>
                                        <th >
                                            Title
                                        </th>

                                        <th >
                                            Status
                                        </th>
                                        <th >
                                            Deadline
                                        </th>
                                        <th >
                                            User
                                        </th>
                                        <th >
                                            Category
                                        </th>
                                        <th>Created Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="12" className="text-center">
                                                <Spinner />
                                            </td>
                                        </tr>
                                    ) : alltask && alltask?.length > 0 ? (
                                        alltask?.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>
                                                    <img src={ImageLink(item?.image)}
                                                        style={{
                                                            height: "60px",
                                                            width: "60px",
                                                            borderRadius: "10%"
                                                        }}
                                                    />
                                                </td>
                                                <td>{item?.title}</td>
                                                <td>
                                                    <span className={`badge 
    ${item?.status === 'pending' ? 'bg-warning text-dark' : ''}
    ${item?.status === 'processing' ? 'bg-primary' : ''}
    ${item?.status === 'completed' ? 'bg-success' : ''}`}>
                                                        {item?.status}
                                                    </span>
                                                </td>

                                                <td>{formatDate(item.deadline)}</td>
                                                <td>{item?.userId?.fullname}</td>
                                                <td>{item?.categoryId?.name}</td>
                                                <td>{formatDate(item.createdAt)}</td>
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
                        {totalPages > 0 && (
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
                        )}
</div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTaskTable;
