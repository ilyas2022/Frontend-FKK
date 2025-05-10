import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ImageCompare.css';
import { FaDownload } from 'react-icons/fa';

const ImageCompare = ({ beforeImage, afterImage, onDownload }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [originalImageDetails, setOriginalImageDetails] = useState({
    width: null,
    height: null,
    ratio: null,
    loaded: false,
  });
  const [afterImageLoaded, setAfterImageLoaded] = useState(false);

  // Función para manejar el movimiento del slider
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    
    // Limitar la posición entre 0 y 100
    const clampedPosition = Math.min(Math.max(position, 0), 100);
    setSliderPosition(clampedPosition);
  };

  // Función para iniciar el arrastre
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevenir selección de texto
    isDraggingRef.current = true;
    handleMove(e.clientX);
  };

  // Función para manejar el movimiento del ratón
  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      e.preventDefault(); // Prevenir selección de texto mientras se arrastra
      handleMove(e.clientX);
    }
  };

  // Función para manejar eventos táctiles
  const handleTouchMove = (e) => {
    if (isDraggingRef.current && e.touches.length > 0) {
      e.preventDefault(); // Prevenir eventos táctiles por defecto
      handleMove(e.touches[0].clientX);
    }
  };

  // Función para detener el arrastre
  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  // Configurar listeners para eventos de ratón y táctiles, y cargar imágenes
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', stopDragging);

    let isMounted = true;
    setOriginalImageDetails(prev => ({ ...prev, loaded: false })); // Reset on image change
    setAfterImageLoaded(false); // Reset on image change

    const beforeImgLoader = new Image();
    beforeImgLoader.src = beforeImage;
    beforeImgLoader.onload = () => {
      if (isMounted) {
        const newRatio = (beforeImgLoader.naturalHeight > 0 && beforeImgLoader.naturalWidth > 0)
          ? beforeImgLoader.naturalHeight / beforeImgLoader.naturalWidth
          : (16 / 9); // Fallback ratio if dimensions are zero

        setOriginalImageDetails({
          width: beforeImgLoader.naturalWidth,
          height: beforeImgLoader.naturalHeight,
          ratio: newRatio,
          loaded: true,
        });
      }
    };
    beforeImgLoader.onerror = (e) => {
      if (isMounted) {
        console.error("Error loading before image:", e);
        // Set a fallback ratio and mark as loaded to prevent perpetual loading state
        setOriginalImageDetails(prev => ({ 
          ...prev, 
          ratio: (16 / 9), // Fallback ratio
          loaded: true 
        }));
      }
    };

    const afterImgLoader = new Image();
    afterImgLoader.src = afterImage;
    afterImgLoader.onload = () => {
      if (isMounted) {
        setAfterImageLoaded(true);
      }
    };
    afterImgLoader.onerror = (e) => {
      if (isMounted) {
        console.error("Error loading after image:", e);
        // Optionally handle error for after image
        setAfterImageLoaded(true); // Mark as loaded to prevent perpetual loading state
      }
    };
    
    return () => {
      isMounted = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopDragging);
    };
  }, [beforeImage, afterImage]); // Dependencies: beforeImage, afterImage

  const allImagesLoaded = originalImageDetails.loaded && afterImageLoaded;

  return (
    <div 
      className="image-compare-container" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        // Permitir eventos de toque en el control deslizante
        if (e.target.closest('.slider-line')) {
          handleMouseDown(e);
        }
      }}
    >
      {/* Botón de descarga en la esquina superior derecha */}
      <button 
        className="download-icon-button" 
        onClick={onDownload}
        aria-label="Download image"
      >
        <FaDownload />
      </button>

      {/* Debugger para verificar URLs de imágenes */}
      <div className="image-debug" style={{ display: 'none' }}>
        <p>Before URL: {beforeImage}</p>
        <p>After URL: {afterImage}</p>
      </div>

      {/* Imagen después (generada) que se muestra en toda la pantalla */}
      <div className="image-after">
        <img 
          src={afterImage} 
          alt="After" 
          onError={(e) => console.error("Error loading after image in img tag:", e)}
          draggable="false"
        />
      </div>

      {/* Contenedor de la imagen original, su ancho se controla por la posición del slider */}
      <div 
        className="image-before" 
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before"
          onError={(e) => console.error("Error loading before image in img tag:", e)}
          draggable="false"
        />
      </div>

      {/* Línea divisoria y control del slider */}
      <div 
        className="slider-line"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="slider-handle">
          <div className="slider-arrows">
            <span>&#8592;</span>
            <span>&#8594;</span>
          </div>
        </div>
      </div>

      {/* Mensaje de carga */}
      {!allImagesLoaded && (
        <div className="loading-images">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      )}
    </div>
  );
};

export default ImageCompare; 