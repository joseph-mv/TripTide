// DeleteConfirmationModal.js
import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this destination?</h3>
        <button className="modal-button" onClick={onConfirm}>Confirm</button>
        <button className="modal-button" onClick={onRequestClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
