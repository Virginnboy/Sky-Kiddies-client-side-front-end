import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { fetchAllProducts, searchProducts } from "../store/util"
import { Truncate } from "../components/Truncating";
import { formattedCurrency } from "../store/util";
import "../pages/HomePage.css";


export default function HomePage() {
  const  search = useOutletContext();

  const { data: products, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ["products", search],
    queryFn: ()=>( search ? searchProducts(search) : fetchAllProducts())
  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isFetching) {
    return <p>Fetching...</p>
  }

  if (isError) {
    return <p>Error: {error.data?.message}</p>
  };  

  console.log(products)


  return (
    <>
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
              <span>Qty: {product.quantity}</span>
            </div>

            <div className="add-to-cart">
              <button className="">Add to Cart</button>
            </div>
          </li>)}
        </ul>
      </div>
    </>
  )
}