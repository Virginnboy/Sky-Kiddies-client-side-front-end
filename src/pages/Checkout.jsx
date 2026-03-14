import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCart, placeOrder } from "../store/util"
import Loading from "../components/Loading";
import "../pages/Checkout.css";
import CartSummary from "./CartSummary";
import { formattedCurrency } from "../store/formattedCurrency";
import CustomerAddress from "./CustomerAddress";
import { PaymentDetails } from "./PaymentDetails";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ paymentMethod, setPaymentMethod ] = useState("")
  const [ showPaymentDetails, setShowPaymentAddress ] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart
  });

  const { mutate, isPending } = useMutation({
    mutationFn: placeOrder,
    onSuccess: (res)=> {
      queryClient.removeQueries(["cart"])
      navigate("/dashboard")
      toast.success(res?.message)
    },
    onError: (err)=> {
      console.log(err)
      toast.error(err.response?.data?.message)
      console.log(err)
      return;
    }
  })

  if (isLoading) return <Loading/>

  const totalPrice = data?.items?.reduce((total, item)=> {
    return total + item.quantity * item.product.price
  },0)

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("paymentMethod", paymentMethod);
    console.log(formData)

    mutate(formData)
  }



  return (
    <main className="checkout-cover">
      <section>
        <CartSummary cartSummary={totalPrice}/>
      </section>

      <section>
        <header>
          <h2>Your Orders</h2>
        </header>
        <ul className="order-container">
          {data?.items.map(item=> <li key={item._id}>
            <div className="order-image-container">
              <img src={item.product.images[0]} alt={item.product._id} />
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
      {/* ORDER PLACING SECTION */}
      <form onSubmit={handlePlaceOrder} encType="multipart/form-data" method="POST">
        <section className="payment-container">
            <header>
              <h2>Payment Method</h2>
            </header>

              {/* Bank Transfer */}
            <label className={`payment-option ${paymentMethod === "Bank-Transfer" ? "active" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="Bank-Transfer"
                checked={paymentMethod === "Bank-Transfer"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                  setShowPaymentAddress(true)
                }}
              />

              <div className="payment-content">
                <h4>Bank Transfer</h4>
                <p>Pay directly to our company bank account</p>
              </div>

              <span className="checkmark"></span>
            </label>


            {/* Card Payment (Disabled) */}
            <label className="payment-option disabled">

              <input
                type="radio"
                name="payment"
                value="card"
                disabled
              />

              <div className="payment-content">
                <h4>Card Payment</h4>
                <p>Pay with Debit / Credit Card</p>
              </div>

              <span className="checkmark"></span>

            </label>

          
        </section>

        <div className="payment-and-address-container">
          {showPaymentDetails && (<section>
            <PaymentDetails/>
          </section>)}
          
          {showPaymentDetails && (<section className="customer-address-container">
            <CustomerAddress isPending={isPending}/>
          </section>)}
          
        </div>
      </form>
    </main>
  )
}