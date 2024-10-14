import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Login } from '../../context/AuthContext';
import { useFormik } from 'formik';
import { LoginFormInitialValues } from '../../data/interfaces/login.interface';
import { LoginSchema } from '../../data/schemas/login.schema';
import { encrypt } from '../../utils/Globals';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleLogin = (loginIntent: Login) => {
    console.log("entro")
    login(loginIntent);
    // Redirigir a /products después del login
    navigate('/products');
  };

  const formik = useFormik({
    initialValues: LoginFormInitialValues,
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: (values) =>  {
      const {  username,password,confirmPassword} = values

      handleLogin({username:username, password:encrypt(password), confirmPassword: encrypt(confirmPassword),loggedIn:false})
    },
  });

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className='login-form' onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email</label>
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

        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
