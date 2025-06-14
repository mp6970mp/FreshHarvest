import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { contentService, CarouselSlide } from "@/services/contentService";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  
  useEffect(() => {
    setSlides(contentService.getCarouselSlides());
  }, []);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

  if (slides.length === 0) return null;

  return (
    <section id="home" className="relative bg-gray-100 h-96 sm:h-[500px] md:h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
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
          {slides.map((_, index) => (
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
