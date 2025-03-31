import { useState } from 'react';
import { BASE_URL } from '../../config.json';


export function useAutorFilter() {
    const [autorLibros, setAutorLibro] = useState([]);
    const [ error, setError ] = useState(null);

    const autorFilter = (e) => {
        const autorLicense = e.target.value;
        if(!autorLicense){
            setAutorLibro([]);
            setError(null);
            return
        }

        fetch(`${BASE_URL}/libros?autor_license=${autorLicense}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`Book not found`);
                }
                return response.json();
            })
            .then(data => {
                setAutorLibro(data);
                setError(null);
            })
            .catch(error => {
                setAutorLibro([]);
                setError(error.message);
            });
    }

    return { autorLibros, error, autorFilter };
}