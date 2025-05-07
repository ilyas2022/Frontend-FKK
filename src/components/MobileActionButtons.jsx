import React from 'react';
import '../styles/MobileActionButtons.css';
import { FaRedo, FaDownload, FaPlus } from 'react-icons/fa';

const MobileActionButtons = ({ onTryAgain, onDownload, onNewDesign, isDisabled }) => {
  return (
    <div className="mobile-action-buttons">
      <button 
        className="mobile-action-btn mobile-try-again" 
        onClick={onTryAgain}
      >
        <FaRedo className="mobile-btn-icon" />
        <span className="mobile-btn-text">Try Again</span>
      </button>
      
      <button 
        className="mobile-action-btn mobile-download" 
        onClick={onDownload}
        disabled={isDisabled}
      >
        <FaDownload className="mobile-btn-icon" />
        <span className="mobile-btn-text">Download</span>
      </button>
      
      <button 
        className="mobile-action-btn mobile-new-design" 
        onClick={onNewDesign}
      >
        <FaPlus className="mobile-btn-icon" />
        <span className="mobile-btn-text">New Design</span>
      </button>
    </div>
  );
};

export default MobileActionButtons; 