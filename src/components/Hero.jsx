import { Link } from "react-router-dom";
import "../components/Hero.css";
import { useRef } from "react";

const Hero = () => {

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <span className="hero-tag">WELCOME TO SKY KIDDIES</span>

        <h1>
          Everything your
          <span> little one </span>
          needs
        </h1>

        <p>
          Discover quality products for your little ones.
          Browse our collection and find something special today.
        </p>

        <a href="#products" className="hero-button">
          Shop Now
        </a>
      </div>

      <div className="hero-decoration">
        <div className="hero-circle">
          🧸
        </div>
      </div>
    </section>
  );
};

export default Hero;