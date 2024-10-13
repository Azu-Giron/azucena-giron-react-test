import React, { useEffect, useState } from 'react';
import ProductForm,{ FormData }  from '../../../components/Products';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormDataProduct, useProduct } from '../../../context/ProductContext';
import { BASE_URL } from '../../../utils/Globals';
import { Method } from '../../../data/interfaces/product.interface';

const EditProduct: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const { getProduct, editProduct } = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<FormDataProduct>({
    id: undefined,
    title: "",
    description: "",
    price:0,
    category: "",
    image: "",
  })

  useEffect(() => {
    if(id === null) {
      navigate("/products")
    }
    let product = getProduct(Number(id))
    if(product === null) {
      navigate("/products")
    } else {
      console.log(product)
      setProduct(product!)
    }
  }, [getProduct, id, navigate])
  
  const onSubmit = async (values: FormData) =>{
    let { ...body } = values

    setIsLoading(true);
    try {
      const response = await axios({
        method:Method.PUT,
        url: `${BASE_URL}/${product.id}`,
        data: body,
      });
      setIsLoading(false);
      editProduct(response.data);
      setProduct(response.data)
      navigate('/products');
    } catch (error) {
      console.log(error)
    };
  }
  
  return (
    <div className='product-container'>
      <div className='product-header'>
        <h2>Detalle producto</h2>
      </div>
      <ProductForm product={product} onSubmit={onSubmit} isLoading={isLoading}/>
    </div>
  );
};

export default EditProduct;