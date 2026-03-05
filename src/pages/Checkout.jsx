import { useQuery } from "@tanstack/react-query"
import { fetchCart } from "../store/util"
import Loading from "../components/Loading";
import "../pages/Checkout.css";
import CartSummary from "./CartSummary";
import { formattedCurrency } from "../store/formattedCurrency";
import CustomerAddress from "./CustomerAddress";
import { PaymentDetails } from "./PaymentDetails";

export default function Checkout() {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart
  });

  if (isLoading) return <Loading/>

  const cartSummary = data?.items?.reduce((total, item)=> {
    return total + item.quantity * item.product.price
  },0)


  return (
    <main className="checkout-cover">
      <section>
        <CartSummary cartSummary={cartSummary}/>
      </section>

      <section>
        <header>
          <h2>Your Orders</h2>
        </header>
        <ul className="order-container">
          {data?.items.map(item=> <li key={item._id}>
            <div className="order-image-container">
              <img src={item.product.images} alt={item.product._id} />
            </div>

            <div className="title-desc-container">
              <h3>{item.product.title}</h3>
              <small>{item.product.description}</small>
            </div>
            
            <div className="price-qty-container">
              <p>{formattedCurrency.format(item.product.price)}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </li>)}
        </ul>
      </section>

      <div className="payment-and-address-container">
        <section>
          <PaymentDetails/>
        </section>
        
        <section className="customer-address-container">
          <CustomerAddress/>
        </section>
      </div>

    </main>
  )
}