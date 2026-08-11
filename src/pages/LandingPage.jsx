import Hero from "../components/Hero";
import WhyShop from "../components/WhyShop";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";


export default function LandingPage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <>
      <Hero/>
      <ProductGrid/>
      <WhyShop/>
      <Footer scrollToTop={scrollToTop}/>
    </>
  )
}