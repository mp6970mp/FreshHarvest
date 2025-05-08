import HeroCarousel from "@/components/HeroCarousel";
import PaymentBanner from "@/components/PaymentBanner";
import ProductCategories from "@/components/ProductCategories";
import AboutUs from "@/components/AboutUs";
import StoreEvents from "@/components/StoreEvents";
import ContactInfo from "@/components/ContactInfo";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Adams Shore Supermarket - Fresh Groceries in Quincy, MA</title>
        <meta name="description" content="Adams Shore Supermarket offers fresh, high-quality groceries at competitive prices in Quincy, MA. We accept SNAP/EBT and major payment methods." />
      </Helmet>
      <HeroCarousel />
      <PaymentBanner />
      <ProductCategories />
      <AboutUs />
      <StoreEvents />
      <Testimonials />
      <ContactInfo />
      <Newsletter />
    </>
  );
};

export default Home;
