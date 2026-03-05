import { useOutletContext } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../store/util"
import { Truncate } from "../components/Truncating";
import { formattedCurrency } from "../store/formattedCurrency";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import "../pages/HomePage.css";


export default function HomePage() {
  const navigate = useNavigate();
  const  { products, isLoading, isQueryError, queryError} = useOutletContext();

// ADD TO CART
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res)=> {
      console.log(res.data?.message)
    },
    onError: (err)=> {
      if (err.response?.status === 401) {
        navigate("/login")
        return;
      }
      console.log(err.response?.data?.message)
    }
  })


  if (isLoading) {
    return <Loading/>
  }

  if (isQueryError) {
    return <p>Error: {queryError.data?.message}</p>
  };  

  const handleAddToCart = (data)=> {
    mutate(data)
  }


  return (
    <>
      <div className="products-container">
        <ul>
          {products?.map((product)=> <li key={product._id}>
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
              <button onClick={()=> handleAddToCart(
                product._id)} >{isPending ? "Adding..." : "Add to Cart"}</button>
            </div>
          </li>)}
        </ul>
      </div>
    </>
  )
}