import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

// Event type definition from database
interface Event {
  id: number;
  title: string;
  description: string;
  month: string;
  day: string;
  time: string;
  location: string;
  color: string;
  createdAt?: string;
}

const StoreEvents = () => {
  // Fetch events from the API
  const { data: events = [], isLoading, error } = useQuery({ 
    queryKey: ['/api/events'],
    queryFn: getQueryFn({ on401: "returnNull" })
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Store Events</h2>
            <p className="text-gray-600">Loading our community events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !events.length) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Store Events</h2>
            <p className="text-gray-600">
              Check back soon for our upcoming community events at Adams Shore Supermarket.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Store Events</h2>
          <p className="text-gray-600">
            Join us for these exciting community events at Adams Shore Supermarket.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: Event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transform transition-transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-${event.color} text-white text-center py-2 px-4 rounded ${event.color === 'accent' ? 'text-gray-800' : ''}`}>
                    <span className="block text-sm">{event.month}</span>
                    <span className="block text-2xl font-bold">{event.day}</span>
                  </div>
                  <span className="text-gray-500 flex items-center">
                    <Clock size={16} className="mr-2" />
                    {event.time}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {event.location}
                  </span>
                  <span className="text-sm text-primary flex items-center cursor-pointer hover:underline">
                    <Calendar size={16} className="mr-1" />
                    Add to Calendar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreEvents;