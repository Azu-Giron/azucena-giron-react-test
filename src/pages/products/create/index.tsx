import React, { useState } from 'react';
import ProductForm,{ FormData } from '../../../components/Products';
import { FormDataProduct, useProduct } from '../../../context/ProductContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Method } from '../../../data/interfaces/product.interface';
import { BASE_URL } from '../../../utils/Globals';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<FormDataProduct>({
    id: undefined,
    title: "",
    description: "",
    price:0,
    category: "",
    image: "",
  })
  
  const onSubmit = async (values: FormData) =>{
    let { ...body } = values

    setIsLoading(true);
    try {
      const response = await axios({
        method:Method.POST,
        url: BASE_URL,
        data: body,
      });
      setIsLoading(false);
      addProduct(response.data);
      setProduct(response.data)
      navigate('/products');
    } catch (error) {
      console.log(error)
    };
  }

  return (
    <div className='product-container'>
      <div className='product-header'>
        <h2>Crear producto</h2>
      </div>
      <ProductForm product={product} onSubmit={onSubmit} isLoading={isLoading}/>
    </div>
  );
};

export default CreateProduct;