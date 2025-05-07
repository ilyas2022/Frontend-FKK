import React from 'react';
// Import styles and room types from external files
import { styles } from './styles.js';
import { roomTypes } from './roomTypes.js';

// DesignForm component that receives various props from parent component
const DesignForm = ({
  previewUrl,           // URL of the uploaded image
  selectedStyle,        // Selected style by the user
  selectedRoom,         // Selected room type
  isLoading,            // Indicates if a design is being generated (true/false)
  error,                // Error message if any
  onFileChange,         // Function to handle image change
  onStyleChange,        // Function to handle style change
  onRoomChange,         // Function to handle room type change
  onSubmit              // Function executed when clicking "Generate design"
}) => {
  return (
    <div className="design-form">
      <div className="image-upload-container">
        {/* If an image is loaded, show the preview */}
        {previewUrl ? (
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <button  
              className="change-image-btn"
              onClick={() => document.getElementById('file-input').click()}
            >
              Change image
            </button>
            
            {/* Mostrar indicador de carga solo si está cargando */}
            {isLoading && (
              <div className="image-loading-overlay">
                <div className="spinner"></div>
                <p>Processing your image...</p>
              </div>
            )}
          </div>
        ) : (
          // If NO image is uploaded, show a clickable area to upload
          <div
            className="upload-placeholder"
            onClick={() => document.getElementById('file-input').click()}
          >
            {/* "+" icon as a visual button */}
            <div className="upload-icon">+</div>
            <p className="upload-text">Upload image</p>
          </div>
        )}

        {/* Hidden file input field that activates when clicking the upload area */}
        <input 
          type="file"
          id="file-input"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      </div>
      
      {/* Only show the options form if an image is uploaded */}
      {previewUrl && (
        <div className="options-container">
          {/* Style selector */}
          <div className="selection-group">
            <label className="selection-label">STYLE</label>
            {/* Dropdown with available styles */}
            <select 
              value={selectedStyle} // Current selected value
              onChange={onStyleChange} // Function called when the user changes the value
              className="style-select"
            >
              {/* Default option that selects nothing */}
              <option value=" ">Select a style</option>

              {/* Map the style list to create menu options */}
              {styles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Room type selector */}
          <div className="selection-group">
            <label className="selection-label">ROOM</label>
            {/* Dropdown with room types */}
            <select 
              value={selectedRoom} // Current selected value
              onChange={onRoomChange} // Function called when the user changes the value
              className="room-select"
            >
              <option value="">Select room type</option>

              {/* Generate each option using roomTypes */}
              {roomTypes.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.label}
                </option>
              ))}
            </select>
          </div>

          {/* Button to generate the design based on image + style + room */}
          <button
            className="generate-btn"
            onClick={onSubmit} // Calls the function to generate the design
            disabled={
              isLoading || // Disabled if generating a design or if image, style or room not selected
              !previewUrl || // Disabled if no image uploaded
              !selectedStyle || // Disabled if no style selected
              !selectedRoom 
            }
          >
            {/* Change text if loading */}
            {isLoading ? 'Generating...' : 'Generate design'}
          </button>
        </div>
      )}
      {/* If there's an error, show the message */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Export the component to import it in other files
export default DesignForm