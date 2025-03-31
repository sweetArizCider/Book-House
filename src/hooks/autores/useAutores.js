import { useEffect, useState } from "react";
import { BASE_URL } from "../../config.json";

export function useAutores() {
    const [autores, setAutores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        const getAutores = async () => {
            try {
                const response = await fetch(`${BASE_URL}/autores`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (!ignore) {
                    setAutores(data);
                    setError(null);
                }
            } catch (error) {
                if (!ignore) {
                    setError(error || "Error al obtener los autores");
                }
            }
        };
        getAutores();

        return () => {
            ignore = true;
        };

        
    }, []);

    return { autores, error };
}

