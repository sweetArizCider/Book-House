import { useState } from 'react';

export function useCrearLibroAI() {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(false); 

    const crearLibroAI = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('https://libreria-y5ka.onrender.com/libros/AI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setSuccess(true); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        crearLibroAI,
        loading,
        error,
        success,
    };
}