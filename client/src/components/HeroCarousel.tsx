import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Fresh Produce Daily",
    description: "Handpicked fruits and vegetables sourced from local farms",
    buttonText: "Explore Our Products",
    buttonLink: "#products",
    buttonVariant: "primary"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Well-Stocked Shelves",
    description: "Find everything you need for your family",
    buttonText: "Visit Us Today",
    buttonLink: "#contact",
    buttonVariant: "secondary"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Serving Our Community",
    description: "Proudly accepting SNAP/EBT and all major payment methods",
    buttonText: "Learn More",
    buttonLink: "#about",
    buttonVariant: "accent"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  }, []);
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="home" className="relative bg-gray-100 h-96 sm:h-[500px] md:h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 text-center text-white">
                <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  className={`bg-${slide.buttonVariant} hover:bg-${slide.buttonVariant}-light text-white font-medium py-2 px-6 rounded-full transition ${
                    slide.buttonVariant === 'accent' ? 'text-gray-800' : ''
                  }`}
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none z-20"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-gray-800" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none z-20"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="text-gray-800" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-20">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
