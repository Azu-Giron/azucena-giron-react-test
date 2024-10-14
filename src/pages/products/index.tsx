import React, { useEffect, useState } from 'react';
import { FormDataProduct } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { PaginationInterface } from '../../data/interfaces/pagination.interface';
import { Order, SortOrder } from '../../data/interfaces/product.interface';
import { Pagination } from '../../components/Pagination';
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

type props = {
  products: FormDataProduct[];
}
const Products: React.FC<props> = (props) => {
  const {products} = props;
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<FormDataProduct[]>([...products])
  const [paginatedProducts, setPaginatedProducts] = useState<FormDataProduct[]>([...products])
  const [pagination, setPagination] = useState<PaginationInterface>({page: 0, pageSize: 5, total: filteredProducts.length})
  const [sortOrder, setSortOrder] = useState<SortOrder>({key: "id", order: Order.asc})
  const [forceSort, setForceSort] = useState<number>(0)
  const [filterValue, setFilterValue] = useState<string>("")

  useEffect(() => {
    const filtered = products.filter(product => product.title.toLowerCase().includes(filterValue.toLowerCase()))
    setFilteredProducts(filtered)
    setPagination((prevState) => ({...prevState, total: filtered.length}))
    setForceSort((prevState) => (prevState + 1))
  }, [products, filterValue])

  useEffect(() => {
    let startIndex = pagination.page * pagination.pageSize
    let endIndex = startIndex + pagination.pageSize > pagination.total ? pagination.total : startIndex + pagination.pageSize
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex))
  }, [pagination, filteredProducts])

  useEffect(() => {
    const orderProducts = () => {
      if (products.length < 1) return
      type ObjectKey = keyof typeof products[0]
      const objectKey = sortOrder.key as ObjectKey
      setFilteredProducts((prevState) => ([...prevState].sort((a, b) => evaluateOrder(a[objectKey], b[objectKey], sortOrder.order))))
      setPagination((prevState) => ({...prevState, page: 0}))
    }

    const evaluateOrder = (a: any, b: any, order: Order) => {
      if(order === Order.asc) {
        return a > b ? 1 : -1
      } else {
        return a < b ? 1 : -1
      }
    }

    orderProducts()
  }, [products, sortOrder, forceSort])

  const onOrderProducts = (key: string) => {
    let order: Order = key === sortOrder.key ? getOpositeOrder(sortOrder.order) : Order.desc
    setSortOrder({key: key, order: order})
  }

  const getOpositeOrder = (currentOrder: Order) => {
    return currentOrder === Order.asc ? Order.desc : Order.asc
  }

  const paginate = (index: number) => {
    setPagination({...pagination, page: index})
  }
  return (
    <div className='product-list-container'>
      <div className='product-list-header'>
        <h2>Lista de productos</h2>
        <button className='product-list-button' onClick={()=>navigate('/products/create')}>Nuevo</button>
      </div>
      <div className="filter-container">
        <div className="filter-input">
          <CiSearch />
          <input type="text" placeholder="Ingrese un producto..." value={filterValue} onChange = {(e) => {setFilterValue(e.target.value)}}  />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th><button className="table-titles" onClick={() => onOrderProducts("id")}>id { sortOrder.key === "id" && ( sortOrder.order === Order.asc ? <FaSortAmountUpAlt /> : <FaSortAmountDown />) } </button></th>
            <th><button className="table-titles" onClick={() => onOrderProducts("title")}>Title { sortOrder.key === "title" && ( sortOrder.order === Order.asc ? <FaSortAmountUpAlt /> : <FaSortAmountDown />) }</button></th>
            <th><button className="table-titles" onClick={() => onOrderProducts("price")}>Price { sortOrder.key === "price" && ( sortOrder.order === Order.asc ? <FaSortAmountUpAlt /> : <FaSortAmountDown />) }</button></th>
            <th><button className="table-titles" onClick={() => onOrderProducts("category")}>Category { sortOrder.key === "category" && ( sortOrder.order === Order.asc ? <FaSortAmountUpAlt /> : <FaSortAmountDown />) } </button></th>
          </tr>
        </thead>
        <tbody>
          { paginatedProducts.map(product => (
            <tr key={product.id} onClick={() => navigate(`/products/update/${product.id}`)}>
              <td>{ product.id }</td>
              <td>{ product.title }</td>
              <td>{ product.price }</td>
              <td>{ product.category }</td>
            </tr>
          ) ) }
        </tbody>
      </table>
      <Pagination pagination={pagination} paginate={paginate} />
    </div>
  );
};

export default Products;
