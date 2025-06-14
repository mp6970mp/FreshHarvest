import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { eventService, Event } from "@/services/eventService";
import { Plus, Trash2, Edit2 } from "lucide-react";

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>(eventService.getEvents());
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    month: "",
    day: "",
    time: "",
    location: "",
    color: "blue"
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.month || 
        !formData.day || !formData.time || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingEvent) {
      const updated = eventService.updateEvent(editingEvent.id, formData);
      if (updated) {
        setEvents(eventService.getEvents());
        toast({
          title: "Event updated",
          description: "The event has been successfully updated"
        });
      }
    } else {
      const newEvent = eventService.addEvent(formData as Omit<Event, 'id'>);
      setEvents(eventService.getEvents());
      toast({
        title: "Event added",
        description: "New event has been successfully added"
      });
    }

    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData(event);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      if (eventService.deleteEvent(id)) {
        setEvents(eventService.getEvents());
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted"
        });
      }
    }
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      month: "",
      day: "",
      time: "",
      location: "",
      color: "blue"
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingEvent ? "Edit Event" : "Add New Event"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select
                value={formData.month}
                onValueChange={(value) => setFormData({ ...formData, month: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                placeholder="Day"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 9:00 AM - 5:00 PM"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Green</SelectItem>
                  <SelectItem value="secondary">Orange</SelectItem>
                  <SelectItem value="accent">Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {editingEvent && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Current Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="text-sm text-gray-500 mt-1">
                  {event.month} {event.day} • {event.time} • {event.location}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(event)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventManager;