import { useState } from 'react';
import useLogin from '../../hooks/login/login'
import styles from './Login.module.css';
import Fondo from '../../assets/img/fondo.png';
import Logo from '../../assets/img/logo.png';
import Loader from '../../Components/Loader/Loader';

function Login() {
  const { loginUser, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      window.location.href = '/home'; 
    } catch (err) {
      console.error('Detalle completo del error:', err);
    }
  };

  return (
    <div className={styles['login-container']}>
      {loading && <Loader />}
      <div className={styles.contenido}>
        <div className={styles['logo-container']}>
          <img src={Logo} alt="Logo de la aplicación" />
        </div>
        <form onSubmit={handleSubmit} className={styles.login}>
          <h1>Iniciar Sesión</h1>
          <h3>¿No tienes una cuenta? <a href="/register" className={styles.anchor}><span>registrarse ahora</span></a></h3>

          

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
            {loading ? 'Iniciando sesión...' : 'Continuar'}
          </button>
          <p>Al hacer clic en 'Continuar', usted acepta que sus datos personales sean utilizados de acuerdo con nuestra política de privacidad.</p>
        </form>
      </div>
      <div className={styles.fondo}>
        <img src={Fondo} alt="Fondo de pantalla" />
      </div>
    </div>
  );
}

export default Login;