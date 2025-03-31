import { useState } from 'react';
import useRegister from '../../hooks/register/register'; // Asegúrate de poner la ruta correcta
import styles from './Register.module.css'; 
import Fondo from '../../assets/img/fondo.png';
import Logo from '../../assets/img/logo.png';
import Loader from '../../Components/Loader/Loader';
function Register() {
  const { registerUser, loading, error } = useRegister();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    usuario: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapear los nombres del formulario al formato del backend
    const cleanedData = {
      ...formData,
      nombre: formData.nombre.trim(),
      apellidoPaterno: formData.apellidoPaterno.trim(),
      apellidoMaterno: formData.apellidoMaterno.trim(),
      email: formData.email.trim().toLowerCase()
    };
  
    try {
      await registerUser(cleanedData);
      // Redirigir a login
    } catch (err) {
      console.error('Detalle completo del error:', err);
    }
  };

  return (
    <div className={styles['register-container']}>


      {loading && <Loader />}


      <div className={styles.fondo}>
        <img src={Fondo} alt="Fondo de pantalla" />
      </div>


      <div className={styles.contenido}>
        <div className={styles['logo-container']}>
          <img src={Logo} alt="Logo de la aplicación" />
        </div>
      
        <form onSubmit={handleSubmit} className={styles.registro}>
          <h1>¡Empieza ahora!</h1>
          <h3>¿Ya tienes una cuenta? <a href="/login" className={styles.anchor}><span>Iniciar sesión</span></a></h3>

          

          <div className={styles['input-field']}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>

          <div className={styles['input-field']}>
            <label htmlFor="apellidoPaterno">Apellido Paterno</label>
            <input
              id="apellidoPaterno"
              name="apellidoPaterno"
              type="text"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              placeholder="Apellido Paterno"
            />
          </div>

          <div className={styles['input-field']}>
            <label htmlFor="apellidoMaterno">Apellido Materno</label>
            <input
              id="apellidoMaterno"
              name="apellidoMaterno"
              type="text"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              placeholder="Apellido Materno"
            />
          </div>

          <div className={styles['input-field']}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
          </div>

          <div className={styles['input-field']}>
            <label htmlFor="usuario">Nombre de Usuario</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
            />
          </div>

          <div className={styles['input-field']}>
            <label htmlFor="contraseña">Contraseña</label>
            <input
              id="contraseña"
              name="contraseña"
              type="password"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <button 
            className="buttonContinuar"
            type="submit"
            disabled={loading}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;