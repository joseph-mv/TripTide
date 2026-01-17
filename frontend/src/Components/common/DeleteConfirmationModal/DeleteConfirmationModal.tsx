import React from "react";
import "./DeleteConfirmationModal.css";

/**
 * A reusable modal component for delete confirmation.
 *
 * @param {Object} props - Component props.
 * @param {string} props.content - Content/message to display in the modal.
 * @param {boolean} props.isOpen - Controls visibility of the modal.
 * @param {Function} props.onRequestClose - Function to call when closing the modal.
 * @param {Function} props.onConfirm - Function to call when confirming deletion.
 * @returns {JSX.Element|null} DeleteConfirmationModal component.
 */
const DeleteConfirmationModal = ({content, isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) {
    document.body.classList.remove("fixed-body");
    return null;
  }
  document.body.classList.add("fixed-body");
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{content}</h3>
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
