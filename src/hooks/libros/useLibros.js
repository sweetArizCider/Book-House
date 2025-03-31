import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config.json';

export function useLibros(){
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        let ignore = false;
        const getLibros = async () => {
            try{
                const response = await fetch(`${BASE_URL}/libros`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (!ignore) {
                    setLibros(data);
                    setError(null);
                }
            }catch(error){
                if(!ignore){
                    setError(error || 'Error al obtener los libros');
                }
            }
        };

        getLibros();

        return () => {
            ignore = true;
        }
        
    }, []);

    return { libros, error };
}