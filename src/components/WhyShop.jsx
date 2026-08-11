import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaShoppingBag
} from "react-icons/fa";

import "../components/WhyShop.css";

const WhyShop = () => {
  const benefits = [
    {
      icon: <FaShoppingBag />,
      title: "Easy Shopping",
      text: "Browse our products and find what you need with ease."
    },
    {
      icon: <FaTruck />,
      title: "Reliable Delivery",
      text: "Get your orders delivered safely and conveniently."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Checkout",
      text: "Shop with confidence using our secure ordering process."
    },
    {
      icon: <FaHeadset />,
      title: "Customer Support",
      text: "We're here to help whenever you need assistance."
    }
  ];

  return (
    <section className="why-shop">
      <div className="why-shop-header">
        <span>WHY SKY KIDDIES?</span>

        <h2>
          Shopping made simple
        </h2>

        <p>
          We want finding the right products for your little ones
          to be simple, convenient and enjoyable.
        </p>
      </div>

      <div className="benefits">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">
              {benefit.icon}
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyShop;