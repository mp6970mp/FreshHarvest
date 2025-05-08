import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Fresh Produce",
    description: "Locally sourced fruits and vegetables delivered daily for maximum freshness.",
    image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Bakery",
    description: "Freshly baked bread, pastries, and desserts made in-store daily.",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
  {
    id: 3,
    title: "Dairy & Eggs",
    description: "Quality milk, cheese, yogurt, and farm-fresh eggs from trusted suppliers.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
  {
    id: 4,
    title: "Meat & Seafood",
    description: "Premium cuts of meat and fresh seafood for your favorite recipes.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Our Fresh Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in offering a wide variety of fresh, high-quality products to meet all your grocery needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a href={category.link} className="text-primary font-medium hover:text-primary-dark flex items-center">
                  Explore <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
