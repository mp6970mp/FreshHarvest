import { useState } from "react";
import { Clock, MapPin, Plus, X, Edit, Calendar, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Event type definition
interface Event {
  id: number;
  title: string;
  description: string;
  date: { month: string; day: string };
  time: string;
  location: string;
  color: string;
}

// Demo events data - in a real application, this would come from a database
const initialEvents: Event[] = [
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

const EventManager = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  
  // New event form state
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: { month: "", day: "" },
    time: "",
    location: "",
    color: "primary"
  });

  const colorOptions = [
    { value: "primary", label: "Green", bg: "bg-primary" },
    { value: "secondary", label: "Orange", bg: "bg-secondary" },
    { value: "accent", label: "Gold", bg: "bg-accent" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "month" || name === "day") {
      setNewEvent(prev => ({
        ...prev,
        date: {
          ...prev.date,
          [name]: value
        }
      }));
    } else {
      setNewEvent(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddEvent = () => {
    // Validate form
    if (!newEvent.title || !newEvent.description || !newEvent.date.month || 
        !newEvent.date.day || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }

    // Create new event with unique ID
    const newId = Math.max(0, ...events.map(e => e.id)) + 1;
    
    // Add to events
    const eventToAdd = {
      ...newEvent,
      id: newId
    };
    
    setEvents([...events, eventToAdd]);
    
    // Reset form
    setNewEvent({
      title: "",
      description: "",
      date: { month: "", day: "" },
      time: "",
      location: "",
      color: "primary"
    });
    
    setIsAddingEvent(false);
    
    toast({
      title: "Event added",
      description: "Your event has been added successfully"
    });
  };

  const startEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: { ...event.date },
      time: event.time,
      location: event.location,
      color: event.color
    });
  };

  const handleUpdateEvent = () => {
    if (!editingEventId) return;
    
    // Validate form
    if (!newEvent.title || !newEvent.description || !newEvent.date.month || 
        !newEvent.date.day || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    // Update event
    const updatedEvents = events.map(event => 
      event.id === editingEventId ? { ...newEvent, id: event.id } : event
    );
    
    setEvents(updatedEvents);
    setEditingEventId(null);
    
    // Reset form
    setNewEvent({
      title: "",
      description: "",
      date: { month: "", day: "" },
      time: "",
      location: "",
      color: "primary"
    });
    
    toast({
      title: "Event updated",
      description: "Your event has been updated successfully"
    });
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    
    toast({
      title: "Event deleted",
      description: "Your event has been removed"
    });
  };

  const cancelEditOrAdd = () => {
    setIsAddingEvent(false);
    setEditingEventId(null);
    setNewEvent({
      title: "",
      description: "",
      date: { month: "", day: "" },
      time: "",
      location: "",
      color: "primary"
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Manager</h1>
        <Button 
          onClick={() => setIsAddingEvent(true)}
          className="bg-primary text-white"
          disabled={isAddingEvent || editingEventId !== null}
        >
          <Plus className="mr-2" size={16} />
          Add New Event
        </Button>
      </div>

      {/* Event Form (Add/Edit) */}
      {(isAddingEvent || editingEventId !== null) && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editingEventId !== null ? "Edit Event" : "Add New Event"}
            </h2>
            <Button variant="ghost" onClick={cancelEditOrAdd}>
              <X size={18} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="e.g. Farmers Market Saturday"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  name="month"
                  value={newEvent.date.month}
                  onChange={handleInputChange}
                  placeholder="e.g. OCT"
                  maxLength={3}
                />
              </div>
              <div>
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  name="day"
                  value={newEvent.date.day}
                  onChange={handleInputChange}
                  placeholder="e.g. 15"
                  maxLength={2}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                placeholder="e.g. 10:00 AM - 2:00 PM"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                placeholder="e.g. Store Parking Lot"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="color">Color Theme</Label>
            <div className="flex space-x-4 mt-2">
              {colorOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`color-${option.value}`}
                    name="color"
                    value={option.value}
                    checked={newEvent.color === option.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`color-${option.value}`}
                    className={`w-10 h-10 rounded-full ${option.bg} cursor-pointer flex items-center justify-center ${
                      newEvent.color === option.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                  >
                    {newEvent.color === option.value && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </label>
                  <span className="ml-2">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Describe your event..."
              rows={3}
            />
          </div>
          
          <Button 
            onClick={editingEventId !== null ? handleUpdateEvent : handleAddEvent}
            className="bg-primary text-white"
          >
            <Save className="mr-2" size={16} />
            {editingEventId !== null ? "Update Event" : "Save Event"}
          </Button>
        </div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
          >
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
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEditEvent(event)}
                    disabled={isAddingEvent || editingEventId !== null}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-destructive hover:text-destructive"
                    disabled={isAddingEvent || editingEventId !== null}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-2 flex items-center">
          <Calendar className="mr-2" size={18} />
          How to manage events
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Use the "Add New Event" button to create new store events</li>
          <li>Click the edit icon on any event card to modify its details</li>
          <li>Click the delete icon to remove an event</li>
          <li>Colors can be customized for each event to categorize them</li>
          <li>Events will appear on the home page in the "Upcoming Store Events" section</li>
        </ul>
      </div>
    </div>
  );
};

export default EventManager;