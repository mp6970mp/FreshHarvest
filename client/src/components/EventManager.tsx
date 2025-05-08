import React, { useState } from "react";
import { Clock, MapPin, Plus, X, Edit, Save, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

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

const EventManager = () => {
  const { toast } = useToast();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  
  // New event form state
  const [newEvent, setNewEvent] = useState<Omit<Event, "id" | "createdAt">>({
    title: "",
    description: "",
    month: "",
    day: "",
    time: "",
    location: "",
    color: "primary"
  });
  
  // Fetch events from the API
  const { data: events = [], isLoading } = useQuery({ 
    queryKey: ['/api/events'],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: Omit<Event, "id" | "createdAt">) => {
      return await apiRequest('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Event created",
        description: "Your event has been added successfully",
      });
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your event",
        variant: "destructive",
      });
    }
  });
  
  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Omit<Event, "id" | "createdAt"> }) => {
      return await apiRequest(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Event updated",
        description: "Your event has been updated successfully",
      });
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your event",
        variant: "destructive",
      });
    }
  });
  
  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/events/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Event deleted",
        description: "Your event has been deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting your event",
        variant: "destructive",
      });
    }
  });

  const colorOptions = [
    { value: "primary", label: "Green", bg: "bg-primary" },
    { value: "secondary", label: "Orange", bg: "bg-secondary" },
    { value: "accent", label: "Gold", bg: "bg-accent" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    // Validate form
    if (!newEvent.title || !newEvent.description || !newEvent.month || 
        !newEvent.day || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }

    // Create the event
    createEventMutation.mutate(newEvent);
  };

  const startEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setNewEvent({
      title: event.title,
      description: event.description,
      month: event.month,
      day: event.day,
      time: event.time,
      location: event.location,
      color: event.color
    });
  };

  const handleUpdateEvent = () => {
    if (!editingEventId) return;
    
    // Validate form
    if (!newEvent.title || !newEvent.description || !newEvent.month || 
        !newEvent.day || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    // Update the event
    updateEventMutation.mutate({ 
      id: editingEventId, 
      data: newEvent 
    });
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setIsAddingEvent(false);
    setEditingEventId(null);
    setNewEvent({
      title: "",
      description: "",
      month: "",
      day: "",
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading events...</span>
        </div>
      )}

      {/* Event Form (Add/Edit) */}
      {(isAddingEvent || editingEventId !== null) && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editingEventId !== null ? "Edit Event" : "Add New Event"}
            </h2>
            <Button variant="ghost" onClick={resetForm}>
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
                  value={newEvent.month}
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
                  value={newEvent.day}
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
            disabled={createEventMutation.isPending || updateEventMutation.isPending}
          >
            {(createEventMutation.isPending || updateEventMutation.isPending) ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={16} />
                {editingEventId !== null ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <Save className="mr-2" size={16} />
                {editingEventId !== null ? "Update Event" : "Save Event"}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && !isAddingEvent && !editingEventId && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl mb-2">No Events Yet</h3>
          <p className="text-gray-500 mb-4">Add your first event to get started</p>
          <Button 
            onClick={() => setIsAddingEvent(true)}
            className="bg-primary text-white"
          >
            <Plus className="mr-2" size={16} />
            Add Event
          </Button>
        </div>
      )}

      {/* Events List */}
      {!isLoading && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: Event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
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
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteEvent(event.id)}
                      disabled={deleteEventMutation.isPending}
                    >
                      {deleteEventMutation.isPending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManager;