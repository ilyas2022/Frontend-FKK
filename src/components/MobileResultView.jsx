import React from 'react';
import MobileImageCompare from './MobileImageCompare';
import MobileActionButtons from './MobileActionButtons';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../styles/MobileResultView.css';

const MobileResultView = ({ 
  beforeImage, 
  afterImage, 
  onDownload, 
  onTryAgain, 
  onNewDesign, 
  error, 
  imageError 
}) => {
  return (
    <div className="mobile-result-view">
      {!imageError ? (
        <MobileImageCompare
          beforeImage={beforeImage}
          afterImage={afterImage}
          onDownload={onDownload}
        />
      ) : (
        <div className="mobile-image-error">
          <FaExclamationTriangle className="mobile-error-icon" />
          <p>There was a problem loading the generated image. Please try again.</p>
        </div>
      )}
      
      <MobileActionButtons
        onTryAgain={onTryAgain}
        onDownload={onDownload}
        onNewDesign={onNewDesign}
        isDisabled={imageError}
      />
      
      {error && <div className="mobile-error-message">{error}</div>}
    </div>
  );
};

export default MobileResultView; 