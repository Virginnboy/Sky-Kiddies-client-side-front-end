import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllProducts } from "../store/util";
import { Truncate } from "./Truncating";
import { formattedCurrency } from "../store/formattedCurrency";
import { addToCart } from "../store/util";
import { useState } from "react";
import toast from "react-hot-toast";
import "../components/Product.css";
import Loading from "./Loading";

const Products = () => {
  const [ addingProduct, setAddingProduct ] = useState(null)
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"))
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts
  })

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onMutate: (variables)=> {
      console.log(variables)
      setAddingProduct(variables.productId)
    },
    onSuccess: (res)=> {
      queryClient.invalidateQueries(['cart'])
      toast.success(res?.message)
    },
    onError: (err)=> {
      console.log(err)
    },
    onSettled: ()=> {
      setAddingProduct(null)
    }
  })

    if (isLoading) {
    return <Loading/>
  }

  const handleAddToCart = (productId) => {
    console.log(productId)
    mutate({productId})
  }

  return (
    <div className="products-container">
        <ul>
          {products.map((product)=> <li key={product._id}>
            <div className="image-container">
              <img src={product.images} alt={product.title}/>
            </div>
            
            <div className="desc-tith">
              <h3>{product.title}</h3>

              <Truncate text={product.description} length={65} className="prod-description"/>

            </div>

            <div className="prod-price-quanty">
              <span className="prod-price">{formattedCurrency.format(product.price)}</span>
              <span>Stock: {product.quantity}</span>
            </div>

            <div className="add-to-cart">
              {user && <button onClick={()=> handleAddToCart(product._id)} >{addingProduct === product._id ? "Adding..." : "Add to Cart"}</button>}
            </div>
          </li>)}
        </ul>
    </div>
  )
}

export default Products