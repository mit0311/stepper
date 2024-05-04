import React, { useState } from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../../../Store/slice/employeeReducer";
import './Modal.scss'


const DeleteModal = (props: {
  openModal: string;
  setOpenModal: CallableFunction;
  setIsDeleted: CallableFunction;
}) => {
  const { openModal, setOpenModal, setIsDeleted } = props;
  const dispatch = useDispatch();
  
  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(openModal));
    setOpenModal("");
    setIsDeleted(true);
  };
  return (
    <>
      <Modal
        open={openModal?.length > 0}
        onClose={() => setOpenModal("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalStyle">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure want to delete the record?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              onClick={() => {
                setOpenModal("");
                setIsDeleted(false);
              }}
              variant="contained"
              className="cancelButton"
            >
              No
            </Button>
            <Button
              onClick={() => {
                handleConfirmDelete();
              }}
              className="deleteButton"
              variant="contained"
            >
              Yes
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
