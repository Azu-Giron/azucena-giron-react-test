import { useFormik } from 'formik';
import { ProductFormSchema } from '../../data/schemas/product.schema';
import { FormDataProduct, useProduct } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: FormDataProduct;
  onSubmit: (product: FormData) => void;
  isLoading: boolean;
};

export interface FormData {
  title: string;
  description: string;
  price: number | '';
  category: string;
  image: string;
}

const ProductForm: React.FC<Props> = (props) => {
  const { product, onSubmit, isLoading } = props;
  const navigate = useNavigate();
  const {deleteProduct } = useProduct();
  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    },
    validationSchema: ProductFormSchema,
    onSubmit: onSubmit,
    enableReinitialize: true
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempURL = URL.createObjectURL(file);
      formik.setFieldValue('image', tempURL)
    };
  }

  const handleRemoveImage = () => {
    if (formik.values.image) {
      URL.revokeObjectURL(formik.values.image);
    }
    formik.setFieldValue('image', "")
  };

  const handleRemoveIdProduct = (id: number)=>{
    deleteProduct(id);
    navigate("/products")
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Nombre del producto:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.title && formik.errors.title &&
          <label className='error'>{formik.errors.title}</label>
        }
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <input
          type="textarea"
          id="description"
          name="description"
          className="form-control"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description &&
          <label className='error'>{formik.errors.description}</label>
        }
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={formik.values.price}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.price && formik.errors.price &&
          <label className='error'>{formik.errors.price}</label>
        }
      </div>
      <div className="form-group">
        <label htmlFor="category">Categoría:</label>
        <input
          type="text"
          id="category"
          name="category"
          className="form-control"
          value={formik.values.category}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.category && formik.errors.category &&
          <label className='error'>{formik.errors.category}</label>
        }
      </div>


      <div className="form-group">
        <label htmlFor="image">Imagen del producto:</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
        />
        {(formik.values.image) && (
          <div>
            <h2>Imagen Cargada:</h2>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <img src={formik.values.image} alt="Producto" style={{ maxWidth: '300px', maxHeight: '200px' }} />
            </div>
            <p><strong>URL Temporal:</strong></p>
            <textarea readOnly value={formik.values.image} style={{ width: '100%', height: '50px' }} />
            <button onClick={handleRemoveImage}>Eliminar Imagen</button>
          </div>
        )}
      </div>
      <div className='container-btn-submit'>
        {product.id &&
          <button type="submit" className="btn-delete" onClick={()=> handleRemoveIdProduct(product.id!)}>Eliminar</button>
        }
        <button type="submit" className="btn-submit">Guardar</button>
      </div>

    </form>

  );
};

export default ProductForm;