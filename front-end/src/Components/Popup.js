import React, { useState } from 'react';
import '../popup.css';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p class="span-close"><button className="close-button" onClick={onClose}>
        
        </button></p>
        {children}
      </div>
    </div>
  );
};

export default Popup;
