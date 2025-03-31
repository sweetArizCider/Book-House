import { useState } from 'react';
import { BASE_URL } from '../../config.json';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Validación mejorada con mensajes específicos
      const validationErrors = [];
      
      if (!userData.usuario || userData.usuario.length < 6 || userData.usuario.length > 50) {
        validationErrors.push('El usuario debe tener entre 6 y 50 caracteres');
      }

      if (!userData.contraseña || userData.contraseña.length < 6 || userData.contraseña.length > 50) {
        validationErrors.push('La contraseña debe tener entre 6 y 50 caracteres');
      }

      if (!/^[a-zA-Zá-úÁ-Ú\s]{2,256}$/.test(userData.nombre)) {
        validationErrors.push('Nombre solo debe contener letras y espacios (2-256 caracteres)');
      }

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(' • '));
      }

      const payload = {
        username: userData.usuario,
        password: userData.contraseña,
        name: userData.nombre.trim(),
        lastname: userData.apellidoPaterno.trim(),
        secondlastname: userData.apellidoMaterno?.trim() || null,
        email: userData.email.toLowerCase().trim()
      };

      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Manejo de respuesta cruda
      const responseText = await response.text();
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Error parsing JSON:', responseText);
        throw new Error(response.statusText || 'Error en el servidor');
      }

      if (!response.ok) {
        const errorMap = {
          400: 'Ha ocurrido un error, inténtelo más tarde',
          409: 'El nombre de usuario ya existe',
          500: 'Ha ocurrido un error, inténtelo más tarde'
        };
        
        const errorMessage = errorMap[response.status] || 
                            data.message || 
                            `Error ${response.status}`;
        
        throw new Error(errorMessage);
      }

      return data;
    } catch (err) {
      const errorMessage = err.message.replace(/['"]+/g, ''); // Limpiar cometas
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;