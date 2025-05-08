import ContactInfo from "@/components/ContactInfo";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Adams Shore Supermarket</title>
        <meta name="description" content="Get in touch with Adams Shore Supermarket in Quincy, MA. Find our store hours, location, and contact information." />
      </Helmet>
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading text-center mb-8">Contact Us</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Get in touch with our team using the information below.
          </p>
        </div>
      </div>
      <ContactInfo />
    </>
  );
};

export default Contact;
