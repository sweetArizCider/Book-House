import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config.json';


export function useISBN(initialIsbn = '') {
    const [libro, setLibro ] = useState(null);
    const [error, setError] = useState(null);
    const [isbn, setIsbn] = useState(initialIsbn);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!isbn){
            setLibro(null);
            setError(null);
            return
        }
        setLoading(true);

        fetch(`${BASE_URL}/libros?isbn=${isbn}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Book not found`);
                }
                return response.json();
            })
            .then(data => {
                setLibro(data[0]);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setLibro(null);
                setError(error.message);
            });
    }, [isbn]);

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

    return { libro, error, handleChange, loading };
}