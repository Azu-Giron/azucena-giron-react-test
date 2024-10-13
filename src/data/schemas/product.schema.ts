import Yup from "../../utils/Yupi18n";

const ProductFormSchema = Yup.object({
  title: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('Nombre es obligatorio'),
  description: Yup.string().required('Descripción es obligatorio'),
  price: Yup.number()
    .positive('El precio debe ser un número positivo')
    .required('Precio es obligatorio'),
  category: Yup.string().required('Categoría es obligatorio'),
  image: Yup.string().required('Debe subir una imagen'),
});

export {  ProductFormSchema };
