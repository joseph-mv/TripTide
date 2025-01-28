// DeleteConfirmationModal.js
import React from "react";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({trip, isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) {
    document.body.classList.remove("fixed-body");
    return null;
  }
  document.body.classList.add("fixed-body");
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this {trip? trip:"destination"}?</h3>
        <button className="modal-button" onClick={onConfirm}>
          Confirm
        </button>
        <button className="modal-button" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
