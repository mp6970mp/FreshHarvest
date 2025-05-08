import { Check, Users, MapPin } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* About Us Image */}
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=900&q=80"
              alt="Adams Shore Supermarket Storefront"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* About Us Content */}
          <div className="lg:w-1/2">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              About Adams Shore Supermarket
            </h2>
            <p className="text-gray-600 mb-6">
              For over 20 years, Adams Shore Supermarket has been proudly serving the Quincy community with fresh, high-quality groceries at competitive prices.
            </p>
            <p className="text-gray-600 mb-6">
              Our family-owned supermarket is committed to providing exceptional customer service and supporting local farmers and producers. We carefully select our products to ensure you get the best quality food for your family.
            </p>
            <p className="text-gray-600 mb-8">
              We're more than just a grocery store – we're a vital part of the neighborhood where community members gather and connect.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Check className="text-white" />
                </div>
                <span className="ml-3 font-medium">Quality Products</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Users className="text-white" />
                </div>
                <span className="ml-3 font-medium">Community Focused</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="text-white" />
                </div>
                <span className="ml-3 font-medium">Locally Owned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
