import React from 'react';


// Definimos un componente funcional llamado LoadingIndicator
// Este componente no recibe props porque siempre muestra lo mismo: un mensaje de carga
const LoadingIndicator = () => {

    return (
        // Contenedor general que se muestra sobre toda la pantalla (overlay)
        <div className="loading-overlay">

             {/* Spinner visual que suele estar animado con CSS para mostrar que está cargando */}
            <div className="loading-spinner"></div>
            
            {/* Mensaje de carga para informar al usuario */}
            <p>Generando tu nuevo diseño...</p>
        </div>
    );
};

// Exportamos el componente para poder utilizarlo en otros archivos
export default LoadingIndicator;