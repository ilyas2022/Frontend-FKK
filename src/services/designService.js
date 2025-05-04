//Aquí defines cómo se comunica tu frontend con el backend Flask

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends a request to generate a new room design
 * @param {File} imageFile - The uploaded image file
 * @param {String} style - The selected style (Modern, Industrial, etc.)
 * @param {String} roomType - The selected room type (Living Room, Office, etc.)
 * @returns {Promise} - Promise resolving to the API response object
 */

export const generateDesign = async (imageFile, style, roomType) => {
    try{
        console.log(`Starting design generation process - Style: ${style}, Room Type: ${roomType}`);
        
        //Step 1: First upload the image to get URL
        const formData = new FormData();
        formData.append('file', imageFile);

        console.log('Uploading image to server...');
        
        //Assuming you have an endpoint to upload images
        const uploadResponse = await axios.post(`${API_URL}/api/upload`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!uploadResponse.data || !uploadResponse.data.url) {
            throw new Error('Image upload failed - No URL returned from server');
        }

        const imageUrl = uploadResponse.data.url;
        console.log('Image uploaded successfully:', imageUrl);

        //Step 2: Send the image URL along with style and room type to generate design
        console.log('Requesting design generation...');
        const response = await axios.post(`${API_URL}/api/generate`,{
            image: imageUrl,
            style: style,
            room: roomType,
        });

        console.log('Design generation response received:', response.data);
        
        // Verificar la respuesta
        if (!response.data || !response.data.result) {
            throw new Error('Invalid response from design generation API');
        }
        
        // Verificar que la URL de la imagen generada sea válida
        const resultUrl = response.data.result;
        console.log('Testing result image URL:', resultUrl);
        
        return response.data;
    } catch (error) {
        console.error('Error in generateDesign service:', error);
        if (error.response) {
            // El servidor respondió con un status fuera del rango 2xx
            console.error('Server responded with error:', error.response.status, error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('No response received from server', error.request);
        }
        throw error;
    }
};