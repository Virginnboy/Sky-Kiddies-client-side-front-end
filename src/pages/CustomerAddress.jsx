import Input from "../components/Input"

export default function CustomerAddress() {
  return (
    <>
      <header>
        <h3>Customers Mailing Address</h3>
      </header>
      <div>
        <Input label="Full name"/>
        <Input label="Mailing Address" textarea/>
        <Input label="Phone Number"/>
        <Input type="file"/>
        <p className="checkout-button-cover">
          <button>Proceed</button>
        </p>
      </div>
    </>
  )
}