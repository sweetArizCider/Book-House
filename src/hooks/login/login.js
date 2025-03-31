import { useState } from 'react';
import { BASE_URL } from '../../config.json';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Validación de campos
      const validationErrors = [];
      
      if (!userData.usuario || userData.usuario.length < 6 || userData.usuario.length > 50) {
        validationErrors.push('El usuario debe tener entre 6 y 50 caracteres');
      }

      if (!userData.contraseña || userData.contraseña.length < 6 || userData.contraseña.length > 50) {
        validationErrors.push('La contraseña debe tener entre 6 y 50 caracteres');
      }

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(' • '));
      }

      const payload = {
        username: userData.usuario,
        password: userData.contraseña
      };

      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Manejo de respuesta
      const responseText = await response.text();
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Error parsing JSON:', responseText);
        throw new Error(response.statusText || 'Ha ocurrido un error, intente más tarde');
      }

      if (!response.ok) {
        const errorMap = {
          404: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo',
          403: 'Cuenta pendiente de activación. Verifica tu bandeja de entrada',
          401: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo',
          500: 'Ha ocurrido un error. Por favor, inténtalo más tarde',
        };
        
        const errorMessage = errorMap[response.status] || 
                            data.message || 
                            `Error ${response.status}`;
        
        throw new Error(errorMessage);
      }

      return data;
    } catch (err) {
      const errorMessage = err.message.replace(/['"]+/g, '');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;