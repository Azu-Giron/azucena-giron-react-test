import Yup from "../../utils/Yupi18n";

const LoginSchema = Yup.object({
  username: Yup.string().email().required("El usuario debe ser un correo eléctronico"),
  password: Yup.string()
  .required()
  .min(6)
  .max(13)
  .label("Contraseña"),
});


const LoginFormSchema = Yup.object({
  username: Yup.string().email().required("El usuario debe ser un correo eléctronico"),
  password: Yup.string()
  .required()
  .min(6)
  .label("Contraseña"),
  confirmPassword: Yup.string()
  .required()
  .oneOf([Yup.ref("password"), ""], "Las contraseñas no coinciden")
  .label("Confirmar contraseña"),
});

export {  LoginSchema,LoginFormSchema };