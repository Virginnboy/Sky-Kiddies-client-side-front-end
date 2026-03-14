import Input from "../components/Input"
import { useNavigate } from "react-router-dom"

export default function CustomerAddress({isPending}) {
  const navigate = useNavigate();

  return (
    <div >
      <header>
        <h3>Customers Mailing Address</h3>
      </header>
      <div>
        <Input 
          label="Full name"
          type="text"
          name="fullName"
          id="fullName"
        />

        <Input 
          label="Mailing Address" 
          type="text"
          name="address"
          id="address"
          textarea
        />

        <Input 
          label="Phone Number"
          type="text"
          name="phone"
          id="phone"
        />
        
        <Input 
          label="Upload Payment Receipt"
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
        />
        <p className="checkout-button-cover">
          <button className="go-back-btn" onClick={()=>navigate(-1)} type="button">Go Back</button>
          <button className="checkout-btn" type="submit">{isPending? "Placing Order..." : "Place Order"}</button>
        </p>
      </div>
    </div>
  )
}