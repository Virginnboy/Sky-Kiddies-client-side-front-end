import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, removeItem, updateItemQuantity } from "../store/util";
import "../pages/CartPage.css"
import { formattedCurrency } from "../store/formattedCurrency";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "../components/Modal"
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ showModal, setShowModal ] = useState(false)
  const [ removingItemId, setRemovingItemId ] = useState(null)

  // FETCH CART FUNCTION
  const { data:cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });

// REMOVE CART FUNCTION
  const { mutate } = useMutation({
    mutationFn: removeItem,
    onSuccess: (res)=> {
      queryClient.invalidateQueries(['cart'])
      toast.success(res?.message)
    },
    onError: (err)=> {
      console.log(err.response?.data?.message)
    }
  })

// UPDATE QUANTITY FUNCTION
  const { mutate: updateQuantityMutate } = useMutation({
    mutationFn: ({id, quantity})=> updateItemQuantity(id, quantity),
    onSuccess: (res)=>{
      queryClient.invalidateQueries(['cart'])
      console.log(res?.message)
    }
  })


  if (isLoading) {
    return <Loading/>
  }

if (cart?.items?.length === 0) {
  return (
    <div className="empty-cart">
      <FaShoppingCart className="empty-cart-icon" />
      <b>Your Cart is Empty</b>
      <p>Browse our categories and discover our best deals!</p>

      <Link to="/dashboard" className="start-shopping-btn">
        Start Shopping
      </Link>
    </div>
  )
}

// REMOVE ITEM BUTTON FUNCTION
  const handleRemoveItem =(id)=> {
    setShowModal(false)
    mutate(id)
  }

  return (
    <div className="cart-container">
      {showModal && <Modal open className="modal-container">
        <h1>Are You Sure?</h1>
        <p>You want to Remove this item</p>

        <div className="modal-btn">
          <button onClick={()=>setShowModal(false)} id="modal-cancel">Cancel</button>
          <button onClick={()=>handleRemoveItem(removingItemId)} id="modal-confirm">Remove</button>
        </div>
      </Modal>}

      <ul className="cart-grid">
        {cart?.items?.map((item)=> 
        <li key={item._id} className="cart-list">
          <div className="cart-image-container">
            <img src={item.product.images[0]} alt={item.product.title}  className="cart-image"/>
          </div>

          <div className="cart">
            <div className="total-per-item">
              <h4>Total:{formattedCurrency.format(item.product.price * item.quantity)}</h4>
            </div>
            <h1>{item.product.title}</h1>

            <p>{item.product.description}</p>

            <h3>{formattedCurrency.format(item.product.price)}</h3>

            <div className="remove-increase-decrease-container">
              <div>
                <button id="cart-decrease-btn"
                  onClick={()=> {
                    if (item.quantity > 1) {
                      updateQuantityMutate({
                        id: item._id,
                        quantity: item.quantity - 1
                      })
                    }
                  }}
                >-</button>

                <span>{item.quantity}</span>

                <button 
                  id="cart-increase-btn"
                  onClick={()=>updateQuantityMutate({
                    id: item._id, 
                    quantity: item.quantity + 1})
                  }
                  >+</button>
              </div>

              <div className="remove-btn-container">
                <button onClick={()=> {
                  setRemovingItemId(item._id); 
                  setShowModal(true);
                  }} className="remove-btn"><FaTrash/>Remove</button>
              </div>
            </div>
          </div>
        </li>)}
        <div className="checkout-container">
          <button onClick={()=>navigate(-1)} id="go-back-btn">Go Back</button>
          <button id="checkout-btn" onClick={()=>navigate("/dashboard/checkout")}>Checkout</button>
        </div>
      </ul>
    </div>
  )
}

export default CartPage
