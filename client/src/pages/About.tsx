import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Adams Shore Supermarket</title>
        <meta name="description" content="Learn about Adams Shore Supermarket, a family-owned grocery store serving the Quincy community with fresh, high-quality products for over 20 years." />
      </Helmet>
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading text-center mb-8">About Us</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Welcome to Adams Shore Supermarket, your neighborhood grocery store in Quincy, MA.
          </p>
        </div>
      </div>
      <AboutUs />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Established in 2002, Adams Shore Supermarket has been a cornerstone of the Quincy community for over two decades. What started as a small family-owned grocery store has grown into a beloved local institution, known for its fresh produce, exceptional customer service, and community involvement.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is simple: to provide high-quality groceries at affordable prices while creating a welcoming shopping environment for our customers. We believe that good food brings people together, and we're proud to play a role in the meals shared around family tables throughout our community.
            </p>
            <p className="text-gray-600">
              Over the years, we've built strong relationships with local farmers and producers, allowing us to offer the freshest seasonal products while supporting the local economy. Our dedicated team works tirelessly to ensure our shelves are well-stocked with a diverse selection of products to meet the needs of our diverse customer base.
            </p>
          </div>
        </div>
      </div>
      <Testimonials />
    </>
  );
};

export default About;
