import Yup from "../../utils/Yupi18n";

const LoginSchema = Yup.object({
  username: Yup.string().email().required("El usuario debe ser un correo eléctronico"),
  password: Yup.string()
  .required()
  .min(6)
  .max(12)
  .matches(/\W|_/g, "Debe contener un carácter")
  .matches(/.*[0-9].*/g, "Debe contener almenos un número")
  .matches(/[A-Z]/g, "Debe contener almenos una letra mayúscula")
  .matches(/[a-z]/g, "Debe contener almenos una letra minúscula")
  .label("Contraseña"),
  confirmPassword: Yup.string()
  .required()
  .oneOf([Yup.ref("password"), ""], "Las contraseñas no coinciden")
  .label("Confirmar contraseña"),
});


const UserFormSchema = Yup.object({
  username: Yup.string().email().required("El usuario debe ser un correo eléctronico"),
});

export {  LoginSchema,UserFormSchema };