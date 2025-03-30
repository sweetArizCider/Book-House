import { useState } from 'react';
import './Register.css'; 
import Fondo from '../../assets/img/fondo.png';
import Logo from '../../assets/img/logo.png';

function Register() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="register-container">
      <div className='fondo'>
        <img src={Fondo} alt="Fondo de pantalla" />
      </div>
      <div className='contenido'>
      <div className='logo-container'>
        <img src={Logo} alt="Logo de la aplicación" />
      </div>
      
      <form onSubmit={handleSubmit} className="registro">
        <h1>¡Empieza ahora!</h1>
        <h3>¿Ya tienes una cuenta? <span>Iniciar sesión</span></h3>

        <div className="input-field">
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

        <div className="input-field">
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

        <div className="input-field">
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

        <div className="input-field">
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

        <div className="input-field">
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

        <div className="input-field">
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

        <button className='buttonContinuar' type="submit">Continuar</button>
        <p>Al hacer clic en 'Continuar', usted acepta que sus datos personales sean utilizados de acuerdo con nuestra política de privacidad.</p>
      </form>
    </div>

      </div>
      
  );
}

export default Register;