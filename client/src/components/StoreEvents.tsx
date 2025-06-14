import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { eventService, Event } from "@/services/eventService";

const StoreEvents = () => {
  const events = eventService.getEvents();

  if (!events.length) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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
              className="group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`h-2 ${
                event.color === 'primary' ? 'bg-primary' :
                event.color === 'secondary' ? 'bg-secondary' :
                'bg-accent'
              }`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${
                    event.color === 'primary' ? 'bg-primary text-white' :
                    event.color === 'secondary' ? 'bg-secondary text-white' :
                    'bg-accent text-gray-800'
                  } text-center py-2 px-4 rounded-lg shadow-sm`}>
                    <span className="block text-sm font-medium">{event.month}</span>
                    <span className="block text-2xl font-bold">{event.day}</span>
                  </div>
                  <span className="text-gray-500 flex items-center bg-gray-50 px-3 py-1 rounded-full text-sm">
                    <Clock size={16} className="mr-2" />
                    {event.time}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 flex items-center bg-gray-50 px-3 py-1 rounded-full">
                    <MapPin size={16} className="mr-2" />
                    {event.location}
                  </span>
                  <button className="text-sm text-primary flex items-center hover:text-primary/80 transition-colors duration-300">
                    <Calendar size={16} className="mr-1" />
                    Add to Calendar
                  </button>
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