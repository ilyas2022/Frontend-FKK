import React, { useState, useEffect, useRef } from 'react';
import '../styles/ImageCompare.css';
import { FaDownload } from 'react-icons/fa';

const ImageCompare = ({ beforeImage, afterImage, onDownload }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: '100%', height: 'auto' });
  const [naturalRatio, setNaturalRatio] = useState(null);

  // Función para calcular dimensiones adecuadas basadas en las imágenes originales
  const calculateDimensions = (image) => {
    if (!image) return;
    
    // Guardar la relación de aspecto original
    const ratio = image.naturalHeight / image.naturalWidth;
    setNaturalRatio(ratio);
    
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const height = containerWidth * ratio;
      
      setContainerDimensions({
        width: '100%',
        height: `${height}px`
      });
    }
  };

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

  // Manejar la carga de imágenes y calcular las dimensiones adecuadas
  const handleImageLoaded = (e) => {
    calculateDimensions(e.target);
    setImagesLoaded(true);
  };

  // Configurar listeners para eventos de ratón y táctiles
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', stopDragging);

    // Asegurarse de que las imágenes se carguen
    const img1 = new Image();
    img1.src = afterImage;
    img1.onload = handleImageLoaded;

    const img2 = new Image();
    img2.src = beforeImage;
    img2.onload = handleImageLoaded;

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopDragging);
    };
  }, [beforeImage, afterImage]);

  // Ajustar altura del contenedor cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && naturalRatio) {
        const containerWidth = containerRef.current.offsetWidth;
        setContainerDimensions({
          width: '100%',
          height: `${containerWidth * naturalRatio}px`
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [naturalRatio]);

  return (
    <div 
      className="image-compare-container" 
      ref={containerRef}
      style={{ 
        height: containerDimensions.height,
        width: containerDimensions.width
      }}
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
          onLoad={handleImageLoaded}
          onError={(e) => console.error("Error loading after image:", e)}
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
          onLoad={handleImageLoaded}
          onError={(e) => console.error("Error loading before image:", e)}
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
      {!imagesLoaded && (
        <div className="loading-images">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      )}
    </div>
  );
};

export default ImageCompare; 