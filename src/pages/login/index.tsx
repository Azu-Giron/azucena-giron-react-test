import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Login } from '../../context/AuthContext';
import { useFormik } from 'formik';
import { LoginFormInitialValues } from '../../data/interfaces/login.interface';
import { LoginSchema } from '../../data/schemas/login.schema';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleLogin = (loginIntent: Login) => {
    const loginInfo = login(loginIntent);

    console.log("=>entro",loginInfo)
    if (!loginInfo) {
      Swal.fire({
        title: "¡Atención!",
        text: "Datos inconrrectos",
        icon: "error",
      });
    } else {
      navigate('/products');
    }
  };

  const formik = useFormik({
    initialValues: LoginFormInitialValues,
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <div className="login-container">

      <form className='login-form' onSubmit={formik.handleSubmit}>
        <h3>Iniciar sesión</h3>
        <div className="form-group">
          <label className='label'>Correo electrónico</label>
          <input
            type="email"
            id="username"
            name="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
          />
          {formik.touched.username && formik.errors.username &&
            <label className='error'>{formik.errors.username}</label>
          }
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password &&
            <label className='error'>{formik.errors.password}</label>
          }
        </div>
        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword &&
            <label className='error'>{formik.errors.confirmPassword}</label>
          }
        </div>

        <button className="login-button" type="submit">Continuar</button>
      </form>
    </div>
  );
}

export default LoginForm;
