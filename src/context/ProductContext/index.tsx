import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormDataProduct {
  id: number | undefined;
  title: string;
  description: string;
  price: number | '';
  category: string;
  image: string;
}

interface ProductContextType {
  products: FormDataProduct[];
  setProducts: (products: FormDataProduct[]) => void;
  addProduct: (product: FormDataProduct) => void;
  getProduct: (id: number) => FormDataProduct | undefined;
  editProduct: (editedProduct: FormDataProduct) => void;
  deleteProduct: (id: number) => void;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct debe usarse dentro de un ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<FormDataProduct[]>([]);

  const addProduct =(product: FormDataProduct) =>{
    setProducts((prevState) => [...prevState, product])
  }

  const getProduct = (id: number) => {
    return products.find(product => product.id === id)
  }

  const handleEdit =(editedProduct: FormDataProduct) =>{
    let index = products.findIndex((product) => product.id === editedProduct.id)
    if(index < -1) {
      console.log("No se pudo editar")
      return
    }
    let editedProducts = [...products]
    editedProducts[index] = editedProduct
    setProducts(editedProducts)
  }

  const handleDelete =(deletedIdProduct: number) =>{
    setProducts((prevState) => prevState.filter(product => product.id !== deletedIdProduct))
  }
  return (
    <ProductContext.Provider value={{ products ,setProducts, addProduct:addProduct, getProduct:getProduct, deleteProduct:handleDelete, editProduct:handleEdit}}>
      {children}
    </ProductContext.Provider>
  );
};
