import React, { useState, useEffect, useRef } from 'react';
import '../styles/MobileImageCompare.css';
import { FaDownload } from 'react-icons/fa';

const MobileImageCompare = ({ beforeImage, afterImage, onDownload }) => {
  const [activeImage, setActiveImage] = useState('after'); // Por defecto muestra la imagen "después"
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Manejar la carga de imágenes
  const handleImageLoaded = () => {
    setImagesLoaded(true);
  };

  // Configurar las imágenes a cargar
  useEffect(() => {
    const img1 = new Image();
    img1.src = afterImage;
    img1.onload = handleImageLoaded;

    const img2 = new Image();
    img2.src = beforeImage;
    img2.onload = handleImageLoaded;
  }, [beforeImage, afterImage]);

  // Alternar entre imágenes antes y después
  const toggleImage = () => {
    setActiveImage(activeImage === 'after' ? 'before' : 'after');
  };

  return (
    <div className="mobile-image-compare-container" ref={containerRef}>
      {/* Botón de descarga */}
      <button 
        className="mobile-download-button" 
        onClick={onDownload}
        aria-label="Download image"
      >
        <FaDownload />
      </button>

      {/* Contenedor de imágenes */}
      <div className="mobile-images-wrapper" onClick={toggleImage}>
        {/* Imagen "antes" */}
        <div className={`mobile-image ${activeImage === 'before' ? 'active' : 'hidden'}`}>
          <img 
            src={beforeImage} 
            alt="Before" 
            onLoad={handleImageLoaded}
            draggable="false"
          />
          <div className="mobile-image-label">Original</div>
        </div>

        {/* Imagen "después" */}
        <div className={`mobile-image ${activeImage === 'after' ? 'active' : 'hidden'}`}>
          <img 
            src={afterImage} 
            alt="After" 
            onLoad={handleImageLoaded}
            draggable="false"
          />
          <div className="mobile-image-label">Redesigned</div>
        </div>
      </div>

      {/* Texto de instrucción para el usuario */}
      <div className="mobile-tap-instruction">
        Tap image to compare before/after
      </div>

      {/* Mensaje de carga */}
      {!imagesLoaded && (
        <div className="mobile-loading-images">
          <div className="mobile-spinner"></div>
          <p>Loading images...</p>
        </div>
      )}
    </div>
  );
};

export default MobileImageCompare; 