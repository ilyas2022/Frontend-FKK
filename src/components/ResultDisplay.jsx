//Importamos React, necesario para usar JSX
import React from 'react';

// Definimos el componente funcional ResultDisplay
// Este componente recibe 3 props:
// - resultImage: una URL de la imagen del diseño generado
// - onTryAgain: función que se ejecuta cuando el usuario quiere probar de nuevo con el mismo estilo
// - onNextDesign: función que se ejecuta cuando el usuario quiere ver otro diseño diferente

const ResultDisplay = ({ resultImage, onTryAgain, onNextDesign}) => {
    return (
        // Contenedor principal que envuelve todo el resultado
        <div className="result-container">

            {/* Contenedor para la imagen del resultado */}
            <div className="result-image-container">
                 {/* Mostramos la imagen del diseño generado usando la URL recibida como prop */}
                 <img src={resultImage} alt="Resultado generado" className="result-image" />
            </div>

             {/* Contenedor de los botones de acción */}
             <div className="action-buttons">
                  {/* Botón que permite volver a intentar con el mismo estilo */}
                  <button className="action-btn try-this-style" onClick={onTryAgain}>
                    Probar estilo
                  </button>

                  {/* Botón para ver otro diseño distinto (quizá una nueva variación) */}
                  <button className="action-btn see-next-design" onClick={onNextDesign}>
                    Ver otro diseño
                  </button>
             </div>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otros archivos (por ejemplo, en un componente padre)
export default ResultDisplay;