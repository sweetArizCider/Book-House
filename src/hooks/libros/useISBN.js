import { useState } from 'react';
import { BASE_URL } from '../../config.json';


export function useISBN() {
    const [libro, setLibro ] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const isbn = e.target.value;
        if(!isbn){
            setLibro(null);
            setError(null);
            return
        }

        fetch(`${BASE_URL}/libros?isbn=${isbn}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Book not found`);
                }
                return response.json();
            })
            .then(data => {
                setLibro(data[0]);
                setError(null);
            })
            .catch(error => {
                setLibro(null);
                setError(error.message);
            });
    };

    return { libro, error, handleChange };
}