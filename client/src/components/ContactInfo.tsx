import { useState, Fragment } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { storeInfo } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactInfo = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find our location and store hours below. We look forward to serving you!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Store Information */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Contact Information</h3>
              <div className="flex items-start mb-4">
                <MapPin className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-lg">Address</h4>
                  <p className="text-gray-600">{storeInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <Phone className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-lg">Phone</h4>
                  <p className="text-gray-600">{storeInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-gray-600">{storeInfo.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-2xl mb-4">Store Hours</h3>
              <div className="grid grid-cols-2 gap-2">
                {storeInfo.hours.map((hour, index) => (
                  <Fragment key={hour.day}>
                    <div className={`py-2 px-3 rounded ${today === index ? 'bg-primary text-white' : ''}`}>
                      <span className="font-medium">{hour.day}</span>
                    </div>
                    <div className={`py-2 px-3 rounded ${today === index ? 'bg-primary text-white' : ''}`}>
                      {hour.hours}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href={storeInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E1306C] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="bg-[#1877F2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="bg-[#1DA1F2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="bg-[#FF0000] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Map & Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="h-64 sm:h-80 md:h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.5246260063707!2d-70.99748728834696!3d42.276548179192086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37d10a8bb8d25%3A0x56f4c77e32e7775e!2sAdams%20Shore%20Supermarket!5e0!3m2!1sen!2sus!4v1653341869304!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Google Maps showing Adams Shore Supermarket location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-bold text-2xl mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-light text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
