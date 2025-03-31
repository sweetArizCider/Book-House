import { useState } from 'react';
import { BASE_URL } from '../../config.json';

export function useCrearLibro() {
    const [formData, setFormData] = useState({
        isbn: '',
        img: '',
        title: '',
        autor_license: '',
        editorial: '',
        pages: '',
        year: '',
        language: '',
        format: '',
        sinopsis: '',
        content: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${BASE_URL}/libros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setSuccess(true); 
            setFormData({
                isbn: '',
                img: '',
                title: '',
                autor_license: '',
                editorial: '',
                pages: '',
                year: '',
                language: '',
                format: '',
                sinopsis: '',
                content: '',
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
}