import { useEffect, useState } from "react";
import { BASE_URL } from "../../config.json";

export function usePrestamos(isbn) {
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAvailable = async (isbn) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/prestamos/${isbn}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
    
            return data.disponible || false;
        } catch (error) {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const returnBook = async (isbn) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/prestamos/${isbn}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error returning the book");
            }

            const data = await response.json();
            console.log("Book returned successfully:", data);

            setIsAvailable(true);
            return data;
        } catch (error) {
            setError("Error returning the book");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createLoan = async (username, isbn) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/prestamos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, isbn }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error creando el préstamo");
            }
    
            const data = await response.json();
    
            setIsAvailable(false); 
            return data;
        } catch (error) {
            setError("Error creando el préstamo");
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        const fetchAvailability = async () => {
            try {
                const available = await getAvailable(isbn);
                if (!ignore) {
                    setIsAvailable(available);
                    setError(null);
                }
            } catch (error) {
                if (!ignore) {
                    setError(error || "Error al obtener la disponibilidad de libros");
                }
            }
        };

        fetchAvailability();

        return () => {
            ignore = true;
        };
    }, [isbn]);

    return { isAvailable, error, loading, getAvailable, returnBook, createLoan };
}