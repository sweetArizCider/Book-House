import { useState } from 'react';
import styles from './Login.module.css';
import Fondo from '../../assets/img/fondo.png';
import Logo from '../../assets/img/logo.png';

function Login() {
   const [formData, setFormData] = useState({
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
       <div className={styles['login-container']}>
         <div className={styles.contenido}>
           <div className={styles['logo-container']}>
             <img src={Logo} alt="Logo de la aplicación" />
           </div>
           <form onSubmit={handleSubmit} className={styles.login}>
             <h1>Iniciar Sesión</h1>
             <h3>¿No tienes una cuenta? <span>registrarse ahora</span></h3>
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
             <button className="buttonContinuar" type="submit">Continuar</button>
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