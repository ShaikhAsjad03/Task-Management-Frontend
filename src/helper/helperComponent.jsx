import { OverlayTrigger, Tooltip } from "react-bootstrap";
const PlusButton = ({ handleAdd }) => {
    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="plus-tooltip">Add</Tooltip>}
        >
            <div
                onClick={handleAdd}
                style={{
                    height: "40px",
                    width: "40px",
                    background: "#656CD9",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                <i className="fa-solid fa-plus"></i>
            </div>
        </OverlayTrigger>
    );
};



const ActionButton = ({ data, handleEditClick, handleDelete, editicon = null, edittitle = null }) => {
    return (
        <div className="template-demo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="edit-tooltip">{edittitle ? edittitle : 'Edit'}</Tooltip>}
            >
                <div style={{ background: "rgba(255, 108, 47, 0.1)", padding: "5px", borderRadius: "5px" }}>
                    <i
                        className={editicon ? editicon : "fa-solid fa-pen-to-square"}
                        style={{
                            cursor: "pointer",
                            color: editicon ? 'rgba(99, 221, 99, 1)' : "rgb(38, 94, 215)",
                            padding: "5px",
                            fontSize: "18px",
                        }}
                        onClick={() => handleEditClick(data)}
                    />
                </div>
            </OverlayTrigger>

            {handleDelete !== undefined && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
                >
                    <div style={{ background: "rgba(255, 77, 107, 0.1)", padding: "5px", borderRadius: "5px" }}>
                        <i
                            className="fa-solid fa-trash-can"
                            onClick={() => handleDelete(data?._id)}
                            style={{
                                cursor: "pointer",
                                color: "rgba(255, 77, 107, 1)",
                                padding: "5px",
                                fontSize: "18px",
                            }}
                        />
                    </div>
                </OverlayTrigger>
            )}
        </div>

    );
};




const RedirectButton = ({  handleEditClick}) => {
    return (
        <div className="template-demo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="edit-tooltip">View</Tooltip>}
            >
                <div style={{ background: "rgba(255, 108, 47, 0.1)", padding: "5px", borderRadius: "5px" }}>
                    <i
                        className="fa-solid fa-eye"
                        style={{
                            cursor: "pointer",
                            color: "rgb(255, 193, 7)",
                            padding: "5px",
                            fontSize: "18px",
                        }}
                        onClick={handleEditClick}
                    />
                </div>
            </OverlayTrigger>

        
        </div>

    );
};
export {PlusButton,ActionButton,RedirectButton}