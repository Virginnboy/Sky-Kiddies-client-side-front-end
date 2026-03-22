import { useQuery } from "@tanstack/react-query"
import { fetchUserOrder } from "../store/util"
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { formattedCurrency } from "../store/formattedCurrency";
import "../pages/Orders.css";

const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-order"],
    queryFn: fetchUserOrder
  });

  console.log(data);
  const orders = data?.userOrder;
  console.log(orders)

  if (isLoading) {
    return <Loading/>
  }

  return (
      
    <div className="user-order-container">
      <section className="go-home">
        <Link className="go-home-link" to="/dashboard">Go Home</Link>
      </section>

      <section className="table-section">
        <header>
          <h2>My Orders</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order)=> (
              order.items?.map((item)=> (
                <tr key={item._id}>
                  <td><b>{order.orderNumber}</b></td>
                  <td>{item.product.title}</td>
                  <td>{item.quantity}</td>
                  <td>{formattedCurrency.format(item.product.price)}</td>
                  <td>{formattedCurrency.format(item.quantity * item.product.price)}</td>
                  <td className={`user-order-status ${order.status.toLowerCase()}`}>{order.status}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Orders