import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "../components/Footer.css";

const Footer = ({scrollToTop}) => {

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>Sky Kiddies</h2>

          <p>
            Quality products for your little ones,
            delivered with care.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>


        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <Link to="/dashboard">Products</Link>
          <Link to="/dashboard/cart">Cart</Link>
          <Link to="/dashboard/orders">Orders</Link>
        </div>


        {/* CUSTOMER */}
        <div className="footer-column">
          <h3>Customer</h3>

          <Link to="/login">Login</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/dashboard/help">Help & Support</Link>
        </div>


        {/* CONTACT */}
        <div className="footer-column">
          <h3>Contact Us</h3>

          <p>Need help with your order?</p>

          <a href="mailto:support@skykiddies.com">
            support@skykiddies.com
          </a>

          <a href="tel:+2340000000000">
            +234 000 000 0000
          </a>
        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Sky Kiddies.
          All rights reserved.
        </p>

        <button
          className="back-to-top"
          onClick={scrollToTop}
          title="Back to top"
        >
          <FaArrowUp />
        </button>

      </div>

    </footer>
  );
};

export default Footer;