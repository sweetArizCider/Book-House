import { useState } from 'react';
import { BASE_URL } from '../../config.json';


export function useAutorFilter() {
    const [autorLibros, setAutorLibro] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const autorFilter = (e) => {
        const autorLicense = e.target.value;
        if(!autorLicense){
            setAutorLibro([]);
            setError(null);
            return
        }
        setLoading(true);
        fetch(`${BASE_URL}/libros?autor_license=${autorLicense}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Book not found`);
                }
                return response.json();
            })
            .then(data => {
                setAutorLibro(data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setAutorLibro([]);
                setLoading(false);
                setError(error.message);
            });
    }

    return { autorLibros, error, autorFilter, loading};
}