// Importamos React y el hook useState
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// Importamos la función que genera el diseño desde un archivo de servicios
import { generateDesign } from '../services/designService.js';

// Importamos los componentes hijos
import DesignForm from '../components/DesignForm.jsx';
import ResultDisplay from '../components/ResultDisplay.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import ImageCompare from '../components/ImageCompare.jsx';
import logoImage from '../assets/images/logo.png';

// Importamos íconos para el botón de descarga
import { FaDownload, FaRedo, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

// Importamos las funciones de Firebase necesarias
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../services/authentication';

// Importamos los estilos generales de la aplicación
import '../styles/Generate.css'

// Definimos el componente principal de la aplicación
function Generate() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  // Estados para manejar los datos
  const [selectedFile, setSelectedFile] = useState(null);         // Archivo de imagen original
  const [previewUrl, setPreviewUrl] = useState(null);             // URL de vista previa de la imagen
  const [selectedStyle, setSelectedStyle] = useState('');         // Estilo seleccionado (ej: moderno, minimalista)
  const [selectedRoom, setSelectedRoom] = useState('');           // Tipo de habitación (ej: cocina, dormitorio)
  const [resultImage, setResultImage] = useState(null);           // Imagen del resultado generado por la IA
  const [isLoading, setIsLoading] = useState(false);              // Indica si está cargando
  const [error, setError] = useState(null);                       // Texto de error (si ocurre alguno)
  const [step, setStep] = useState('upload');                     // Controla qué se muestra: 'upload' o 'result'
  const [imageError, setImageError] = useState(false);            // Error específico de carga de imágenes
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        
        // Obtener créditos desde Firestore
        const db = getFirestore(app);
        const userRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setCredits(userDoc.data().credits || 0);
        }
      } else {
        // Si no hay usuario, redirigir al login
        navigate('/login');
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      console.log("Preview URL created:", url);
      setPreviewUrl(url);
      setStep('upload');
      setResultImage(null);
      setImageError(false);
    }
  };

  // Función para manejar el cambio de tipo de habitación
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !selectedStyle || !selectedRoom) {
      setError("Please complete all fields before generating the design.");
      return;
    }

    // Verificar si el usuario tiene créditos suficientes
    if (credits <= 0) {
      setError("You don't have enough credits. Please purchase more.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageError(false);

    try {
      const result = await generateDesign(selectedFile, selectedStyle, selectedRoom);
      
      console.log("Generated image result:", result);
      
      // Verificar si el resultado tiene la URL de la imagen
      if (result && result.result) {
        // Cargar previamente la imagen para asegurarnos de que está disponible
        const imgLoader = new Image();
        imgLoader.onload = () => {
          console.log("Result image loaded successfully");
          
          // Si la generación fue exitosa, reducir los créditos del usuario
          const db = getFirestore(app);
          const userRef = doc(db, "users", user.uid);
          updateDoc(userRef, {
            credits: credits - 1
          }).then(() => {
            // Actualizar el estado local de créditos
            setCredits(prevCredits => prevCredits - 1);
            
            // Establecer la imagen resultante y cambiar a la vista de resultados
            setResultImage(result.result);
            setStep('result');
          }).catch(err => {
            console.error("Error updating credits:", err);
            setError("Your design was generated, but we couldn't update your credits. Please contact support.");
          });
        };
        
        imgLoader.onerror = () => {
          console.error("Failed to load result image:", result.result);
          setImageError(true);
          setError("We generated your design, but the image couldn't be loaded. Please try again.");
        };
        
        imgLoader.src = result.result;
      } else {
        throw new Error("No result image URL returned from the server");
      }
    } catch (err) {
      console.error("Error generating design:", err);
      setError('Error generating the design. Please try again.');
      setImageError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setStep('upload');
    setImageError(false);
  };

  const handleNextDesign = () => {
    setResultImage(null);
    setStep('upload');
    setImageError(false);
  };
  
  // Función para descargar la imagen generada
  const handleDownload = async () => {
    if (!resultImage) return;
    
    try {
      // Crear una referencia a la imagen
      const response = await fetch(resultImage);
      const blob = await response.blob();
      
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear un enlace temporal y simular un clic
      const link = document.createElement('a');
      link.href = url;
      
      // Nombre del archivo con fecha y estilo
      const date = new Date().toISOString().slice(0, 10);
      link.download = `roomio-${selectedStyle.toLowerCase()}-${date}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      
      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      setError('Could not download the image. Please try again.');
    }
  };

  // Renderizado principal del componente
  return (
    <div className='generate-page'>
      {/* Cabecera con los créditos actualizados */}
      <Header userCredits={credits} />

      {/* Contenido principal */}
      <div className="main-content">
        {/* Mostramos el formulario si estamos en la etapa "upload" */}
        {step === 'upload' && (
          <DesignForm
            previewUrl={previewUrl}              // URL de vista previa de la imagen
            selectedStyle={selectedStyle}        // Estilo seleccionado
            selectedRoom={selectedRoom}          // Tipo de habitación seleccionada      
            isLoading={isLoading}                // Indica si se está generando un diseño
            error={error}                        // Mensaje de error si ocurre alguno      
            onFileChange={handleFileChange}      // Función para manejar el cambio de imagen
            onStyleChange={e => setSelectedStyle(e.target.value)} // Función para manejar el cambio de estilo
            onRoomChange={handleRoomChange}      // Función para manejar el cambio de habitación
            onSubmit={handleSubmit}              // Función que se ejecuta al hacer clic en "Generar diseño"
          />
        )}

        {step === 'result' && resultImage && previewUrl && (
          <div className="result-section">
            {/* Información de depuración (oculta en producción) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="debug-info" style={{display: 'none'}}>
                <h4>Debug Info:</h4>
                <p>Before Image: {previewUrl}</p>
                <p>After Image: {resultImage}</p>
              </div>
            )}
            
            {/* Componente para comparar las imágenes */}
            {!imageError ? (
              <ImageCompare 
                beforeImage={previewUrl}
                afterImage={resultImage}
              />
            ) : (
              <div className="image-error">
                <FaExclamationTriangle className="error-icon" />
                <p>There was a problem loading the generated image. Please try again.</p>
              </div>
            )}
            
            <div className="result-actions">
              <button onClick={handleTryAgain} className="action-btn try-again-btn">
                <FaRedo className="btn-icon" /> Try Again
              </button>
              <button onClick={handleDownload} className="action-btn download-btn" disabled={imageError}>
                <FaDownload className="btn-icon" /> Download
              </button>
              <button onClick={handleNextDesign} className="action-btn next-design-btn">
                <FaPlus className="btn-icon" /> New Design
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en App.jsx
export default Generate;
