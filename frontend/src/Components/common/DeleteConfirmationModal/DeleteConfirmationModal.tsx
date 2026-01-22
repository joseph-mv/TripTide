import React from "react";
import "./DeleteConfirmationModal.css";


interface DeleteConfirmationModalProps {
  content: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ content, isOpen, onRequestClose, onConfirm }) => {
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
