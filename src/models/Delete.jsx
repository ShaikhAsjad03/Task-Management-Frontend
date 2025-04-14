import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteModel = ({
    deleteModalOpen,
    setDeleteModalOpen,
    onConfirm,
    itemName,
}) => {
    return (
        <Modal isOpen={deleteModalOpen} toggle={setDeleteModalOpen}>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>
                Are you sure you want to delete this {itemName}?
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    className="btn btn-success btn-fw"
                    onClick={setDeleteModalOpen}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    className="btn btn-danger btn-fw"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteModel;
