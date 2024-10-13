import { FormDataProduct } from "../../context/ProductContext";

const ProductFormInitialValues = {
  title: "",
  description: "",
  price:0,
  category: "",
  image: "",
};

export interface SortOrder {
  key: string
  order: Order
}


enum Order {
  asc = "ASC", 
  desc = "DESC"
}

enum Method {
  GET = "get",
  POST = "post",
  PUT = "put"
}

export { ProductFormInitialValues,Order,Method };