import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Navbar from './components/Navbar';
import ProtectedRoute from './pages/protectedRoute';
import Products from './pages/products';
import NotFound from './pages/notFound';
import CreateProduct from './pages/products/create'
import axios from 'axios';
import { Method } from './data/interfaces/product.interface';
import { BASE_URL } from './utils/Globals';
import { useProduct } from './context/ProductContext';
import EditProduct from './pages/products/update';
import { useAuth } from './context/AuthContext';
import MyPerfil from './pages/user';

const App: React.FC = () => {
  const { isAuthenticated, setStaticUser,isLoggedin } = useAuth()
  const { products, setProducts } = useProduct();

  useEffect(() => {
    setStaticUser();
    isLoggedin();
    const getProducts = async () => {
      try {
        const response = await axios({
          method: Method.GET,
          url: BASE_URL
        });
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuthenticated && (
          <>
            <Route path="/products" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <Products products={products} />
              </ProtectedRoute>
            } />
            <Route path="/products/create" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <CreateProduct />
              </ProtectedRoute>
            } />
            <Route path="/products/update/:id" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <EditProduct />
              </ProtectedRoute>
            } />
            <Route path="/myperfil" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <MyPerfil />
              </ProtectedRoute>
            } />
          </>
        )}

        {/* Ruta para página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
