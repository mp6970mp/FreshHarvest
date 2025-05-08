import { Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Farmers Market Saturday",
    description: "Meet local farmers and sample fresh, seasonal produce in our parking lot market.",
    date: { month: "OCT", day: "15" },
    time: "10:00 AM - 2:00 PM",
    location: "Store Parking Lot",
    color: "primary"
  },
  {
    id: 2,
    title: "Wine & Cheese Tasting",
    description: "Sample our finest selection of wines paired with artisanal cheeses.",
    date: { month: "OCT", day: "22" },
    time: "4:00 PM - 6:00 PM",
    location: "Deli Department",
    color: "secondary"
  },
  {
    id: 3,
    title: "Fall Harvest Festival",
    description: "Family-friendly event with pumpkin decorating, apple cider, and seasonal treats.",
    date: { month: "OCT", day: "29" },
    time: "12:00 PM - 3:00 PM",
    location: "Throughout Store",
    color: "accent"
  }
];

const StoreEvents = () => {
  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Upcoming Store Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for special events, tastings, and promotions happening at Adams Shore Supermarket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-${event.color} text-white text-center py-2 px-4 rounded ${event.color === 'accent' ? 'text-gray-800' : ''}`}>
                    <span className="block text-sm">{event.date.month}</span>
                    <span className="block text-2xl font-bold">{event.date.day}</span>
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
                  <a href="#" className="text-primary font-medium hover:text-primary-dark">
                    Learn More
                  </a>
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
