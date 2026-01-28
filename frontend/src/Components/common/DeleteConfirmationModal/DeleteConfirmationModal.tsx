import React from "react";
import "./DeleteConfirmationModal.css";


interface DeleteConfirmationModalProps {
  content: string;
  isOpen: boolean;
  onRequestClose?: (e?: React.MouseEvent) => void;
  onConfirm?: (e?: React.MouseEvent) => void;
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
        <button type="button" className="modal-button" onClick={(e) => onConfirm?.(e)}>
          Confirm
        </button>
        <button type="button" className="modal-button" onClick={(e) => onRequestClose?.(e)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
