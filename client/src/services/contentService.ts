import carouselData from '@/data/carousel.json';
import aboutData from '@/data/about.json';
import testimonialsData from '@/data/testimonials.json';
import contactData from '@/data/contact.json';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: string;
}

export interface AboutData {
  image: string;
  title: string;
  description: string[];
  features: {
    icon: string;
    text: string;
  }[];
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  storeHours: {
    day: string;
    hours: string;
  }[];
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  mapEmbed: string;
}

class ContentService {
  // Carousel
  getCarouselSlides(): CarouselSlide[] {
    return carouselData.slides;
  }

  updateCarouselSlides(slides: CarouselSlide[]): void {
    carouselData.slides = slides;
  }

  // About
  getAboutData(): AboutData {
    return aboutData;
  }

  updateAboutData(data: AboutData): void {
    Object.assign(aboutData, data);
  }

  // Testimonials
  getTestimonials(): Testimonial[] {
    return testimonialsData.testimonials;
  }

  updateTestimonials(testimonials: Testimonial[]): void {
    testimonialsData.testimonials = testimonials;
  }

  // Contact
  getContactData(): ContactData {
    return contactData;
  }

  updateContactData(data: ContactData): void {
    Object.assign(contactData, data);
  }
}

export const contentService = new ContentService(); 