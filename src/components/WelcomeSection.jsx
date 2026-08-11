import { Link } from "react-router-dom";
import { FaShoppingCart, FaBoxOpen, FaComments } from "react-icons/fa";
import "../components/WelcomeSection.css";

const WelcomeSection = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="dashboard-home">

      {/* WELCOME */}
      <section className="dashboard-welcome">
        <div>
          <p className="welcome-small">Welcome back 👋</p>

          <h1>
            Hi, {user?.firstName || "there"}!
          </h1>

          <p>
            Find something special for your little one today.
          </p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions">

        <Link to="/dashboard/cart" className="dashboard-card">
          <FaShoppingCart className="dashboard-icon" />

          <div>
            <h3>Your Cart</h3>
            <p>View items in your cart</p>
          </div>
        </Link>

        <Link to="/dashboard/orders" className="dashboard-card">
          <FaBoxOpen className="dashboard-icon" />

          <div>
            <h3>My Orders</h3>
            <p>Track your orders</p>
          </div>
        </Link>

        <Link to="/dashboard/help" className="dashboard-card">
          <FaComments className="dashboard-icon" />

          <div>
            <h3>Help & Support</h3>
            <p>Talk to our support team</p>
          </div>
        </Link>

      </section>

      {/* PRODUCTS */}
      <section className="dashboard-products">
        <div className="dashboard-section-header">
          <div>
            <h2>Available Products</h2>
            <p>Explore our collection</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default WelcomeSection;