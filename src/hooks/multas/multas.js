
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config.json';

const useMultas = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [multasData, setMultasData] = useState([]);

  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/multas/all`);
        const responseText = await response.text();
        
        if (!response.ok) {
          if (response.status === 404) {
            setMultasData([]);
            return;
          }
          throw new Error(response.statusText || 'Error desconocido');
        }

        const data = responseText ? JSON.parse(responseText) : [];
        setMultasData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMultas();
  }, []);

  return { loading, error, multasData };
};

export default useMultas;