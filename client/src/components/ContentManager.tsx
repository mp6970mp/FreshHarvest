import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contentService, CarouselSlide, AboutData, Testimonial, ContactData } from "@/services/contentService";
import { eventService } from "@/services/eventService";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("carousel");
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = () => {
    setCarouselSlides(contentService.getCarouselSlides());
    setAboutData(contentService.getAboutData());
    setTestimonials(contentService.getTestimonials());
    setContactData(contentService.getContactData());
    setEvents(eventService.getEvents());
  };

  // Carousel Management
  const handleCarouselUpdate = (index: number, field: keyof CarouselSlide, value: string) => {
    const newSlides = [...carouselSlides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setCarouselSlides(newSlides);
  };

  const saveCarousel = () => {
    contentService.updateCarouselSlides(carouselSlides);
    toast({
      title: "Success",
      description: "Carousel slides updated successfully.",
    });
  };

  // About Management
  const handleAboutUpdate = (field: keyof AboutData, value: any) => {
    if (aboutData) {
      setAboutData({ ...aboutData, [field]: value });
    }
  };

  const saveAbout = () => {
    if (aboutData) {
      contentService.updateAboutData(aboutData);
      toast({
        title: "Success",
        description: "About section updated successfully.",
      });
    }
  };

  // Testimonials Management
  const handleTestimonialUpdate = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setTestimonials(newTestimonials);
  };

  const saveTestimonials = () => {
    contentService.updateTestimonials(testimonials);
    toast({
      title: "Success",
      description: "Testimonials updated successfully.",
    });
  };

  // Contact Management
  const handleContactUpdate = (field: string, value: string) => {
    if (contactData) {
      const newData = { ...contactData };
      const fields = field.split('.');
      if (fields.length === 1) {
        newData[field as keyof ContactData] = value;
      } else {
        (newData[fields[0] as keyof ContactData] as any)[fields[1]] = value;
      }
      setContactData(newData);
    }
  };

  const saveContact = () => {
    if (contactData) {
      contentService.updateContactData(contactData);
      toast({
        title: "Success",
        description: "Contact information updated successfully.",
      });
    }
  };

  // Events Management
  const handleEventUpdate = (index: number, field: string, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const saveEvents = () => {
    eventService.updateEvents(events);
    toast({
      title: "Success",
      description: "Events updated successfully.",
    });
  };

  // Add new item handlers
  const addCarouselSlide = () => {
    const newSlide: CarouselSlide = {
      id: carouselSlides.length + 1,
      image: "",
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      buttonVariant: "primary"
    };
    setCarouselSlides([...carouselSlides, newSlide]);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      name: "",
      title: "",
      content: "",
      rating: 5
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "",
      description: "",
      month: "",
      day: "",
      time: "",
      location: "",
      color: "primary"
    };
    setEvents([...events, newEvent]);
  };

  // Remove item handlers
  const removeCarouselSlide = (index: number) => {
    const newSlides = carouselSlides.filter((_, i) => i !== index);
    setCarouselSlides(newSlides);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
  };

  const removeEvent = (index: number) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Content Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="carousel"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Carousel
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            About
          </TabsTrigger>
          <TabsTrigger 
            value="testimonials"
            className="data-[state=active]:bg-accent data-[state=active]:text-gray-800"
          >
            Testimonials
          </TabsTrigger>
          <TabsTrigger 
            value="events"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Events
          </TabsTrigger>
          <TabsTrigger 
            value="contact"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            Contact
          </TabsTrigger>
        </TabsList>

        {/* Carousel Tab */}
        <TabsContent value="carousel">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Carousel Slides</CardTitle>
              <Button onClick={addCarouselSlide} className="bg-primary hover:bg-primary-light text-white">
                Add New Slide
              </Button>
            </CardHeader>
            <CardContent>
              {carouselSlides.map((slide, index) => (
                <div key={slide.id} className="mb-6 p-4 border rounded-lg relative">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeCarouselSlide(index)}
                  >
                    Remove
                  </Button>
                  <h3 className="text-lg font-semibold mb-4">Slide {index + 1}</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={slide.image}
                        onChange={(e) => handleCarouselUpdate(index, 'image', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => handleCarouselUpdate(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={slide.description}
                        onChange={(e) => handleCarouselUpdate(index, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={slide.buttonText}
                        onChange={(e) => handleCarouselUpdate(index, 'buttonText', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Button Link</Label>
                      <Input
                        value={slide.buttonLink}
                        onChange={(e) => handleCarouselUpdate(index, 'buttonLink', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Button Variant</Label>
                      <Input
                        value={slide.buttonVariant}
                        onChange={(e) => handleCarouselUpdate(index, 'buttonVariant', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={saveCarousel} className="bg-primary hover:bg-primary-light text-white">
                Save Carousel Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Manage About Section</CardTitle>
            </CardHeader>
            <CardContent>
              {aboutData && (
                <div className="grid gap-4">
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={aboutData.image}
                      onChange={(e) => handleAboutUpdate('image', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={aboutData.title}
                      onChange={(e) => handleAboutUpdate('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    {aboutData.description.map((paragraph, index) => (
                      <Textarea
                        key={index}
                        value={paragraph}
                        onChange={(e) => {
                          const newDescription = [...aboutData.description];
                          newDescription[index] = e.target.value;
                          handleAboutUpdate('description', newDescription);
                        }}
                        className="mb-2"
                      />
                    ))}
                  </div>
                  <Button onClick={saveAbout} className="bg-secondary hover:bg-secondary-light text-white">
                    Save About Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Testimonials</CardTitle>
              <Button onClick={addTestimonial} className="bg-accent hover:bg-accent-light text-gray-800">
                Add New Testimonial
              </Button>
            </CardHeader>
            <CardContent>
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="mb-6 p-4 border rounded-lg relative">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeTestimonial(index)}
                  >
                    Remove
                  </Button>
                  <h3 className="text-lg font-semibold mb-4">Testimonial {index + 1}</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialUpdate(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={testimonial.title}
                        onChange={(e) => handleTestimonialUpdate(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) => handleTestimonialUpdate(index, 'content', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        step="0.5"
                        value={testimonial.rating}
                        onChange={(e) => handleTestimonialUpdate(index, 'rating', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={saveTestimonials} className="bg-accent hover:bg-accent-light text-gray-800">
                Save Testimonial Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Events</CardTitle>
              <Button onClick={addEvent} className="bg-primary hover:bg-primary-light text-white">
                Add New Event
              </Button>
            </CardHeader>
            <CardContent>
              {events.map((event, index) => (
                <div key={event.id} className="mb-6 p-4 border rounded-lg relative">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeEvent(index)}
                  >
                    Remove
                  </Button>
                  <h3 className="text-lg font-semibold mb-4">Event {index + 1}</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={event.title}
                        onChange={(e) => handleEventUpdate(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleEventUpdate(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Month</Label>
                        <Input
                          value={event.month}
                          onChange={(e) => handleEventUpdate(index, 'month', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Day</Label>
                        <Input
                          value={event.day}
                          onChange={(e) => handleEventUpdate(index, 'day', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        value={event.time}
                        onChange={(e) => handleEventUpdate(index, 'time', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={event.location}
                        onChange={(e) => handleEventUpdate(index, 'location', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Color</Label>
                      <select
                        value={event.color}
                        onChange={(e) => handleEventUpdate(index, 'color', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="primary">Green (Primary)</option>
                        <option value="secondary">Orange (Secondary)</option>
                        <option value="accent">Gold (Accent)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={saveEvents} className="bg-primary hover:bg-primary-light text-white">
                Save Event Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Manage Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              {contactData && (
                <div className="grid gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={contactData.title}
                      onChange={(e) => handleContactUpdate('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={contactData.subtitle}
                      onChange={(e) => handleContactUpdate('subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={contactData.contactInfo.address}
                      onChange={(e) => handleContactUpdate('contactInfo.address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={contactData.contactInfo.phone}
                      onChange={(e) => handleContactUpdate('contactInfo.phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={contactData.contactInfo.email}
                      onChange={(e) => handleContactUpdate('contactInfo.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Map Embed URL</Label>
                    <Input
                      value={contactData.mapEmbed}
                      onChange={(e) => handleContactUpdate('mapEmbed', e.target.value)}
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Store Hours</h3>
                    <div className="grid gap-4">
                      {contactData.storeHours.map((hour, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Day</Label>
                            <Input
                              value={hour.day}
                              onChange={(e) => {
                                const newHours = [...contactData.storeHours];
                                newHours[index] = { ...newHours[index], day: e.target.value };
                                handleContactUpdate('storeHours', newHours);
                              }}
                            />
                          </div>
                          <div>
                            <Label>Hours</Label>
                            <Input
                              value={hour.hours}
                              onChange={(e) => {
                                const newHours = [...contactData.storeHours];
                                newHours[index] = { ...newHours[index], hours: e.target.value };
                                handleContactUpdate('storeHours', newHours);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="grid gap-4">
                      <div>
                        <Label>Instagram</Label>
                        <Input
                          value={contactData.socialMedia.instagram}
                          onChange={(e) => handleContactUpdate('socialMedia.instagram', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Facebook</Label>
                        <Input
                          value={contactData.socialMedia.facebook}
                          onChange={(e) => handleContactUpdate('socialMedia.facebook', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Twitter</Label>
                        <Input
                          value={contactData.socialMedia.twitter}
                          onChange={(e) => handleContactUpdate('socialMedia.twitter', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>YouTube</Label>
                        <Input
                          value={contactData.socialMedia.youtube}
                          onChange={(e) => handleContactUpdate('socialMedia.youtube', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={saveContact} className="bg-secondary hover:bg-secondary-light text-white">
                    Save Contact Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager; 