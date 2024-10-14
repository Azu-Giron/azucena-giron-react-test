import React from 'react';
import { UserFormSchema } from '../../data/schemas/login.schema';
import { useFormik } from 'formik';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';


const MyPerfil: React.FC = () => {
  const { user, updateUserInfo } = useAuth()
  const formik = useFormik({
    initialValues: { username: user?.username ?? "" },
    validationSchema: UserFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { username } = values;
      updateUserInfo({
        username: username,
        password: "501fe884fdbbb0bceafff5f4fd2f3423cd32d435e96a0a85e56cdf067a632894"
      })
    }
  });

  return (
    <div className='myperfil-container'>
      <div className='myperfil-header'>
        <h2>Mi perfil</h2>
      </div>
      <div className='myperfil-card '>
        <div className='myperfil-div-photo'>
          <FaUserCircle className='myperfil-icon ' />
          <label>{user?.username}</label>
        </div>

        <div style={{ padding: "0px 20px 0px 20px" }}>
          <div style={{ border: "0.5px solid #dadada69", height: "200px" }} ></div>
        </div>

        <div className='myperfil-div-Form'>
          <label className='titulo_form'>Editar usuario de perfil</label>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username &&
                <label className='error'>{formik.errors.username}</label>
              }
            </div>
            <div className='container-btn-submit'>
              <button type="submit" className="btn-submit">Actualizar</button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default MyPerfil;