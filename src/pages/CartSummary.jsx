import { formattedCurrency } from "../store/formattedCurrency"

const CartSummary = ({cartSummary}) => {
  return (
    <div className="cart-summary-container">
      <div className="cart-summary">
        <h1>CART SUMMARY</h1>
        <span>
          <p>subtotal: </p> 
          <p>{formattedCurrency.format(cartSummary)}</p>
        </span>
      </div>
    </div>
  )
}

export default CartSummary