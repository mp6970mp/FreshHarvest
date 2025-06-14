import eventsData from '../data/events.json';

export interface Event {
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

export interface StoreInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface EventsData {
  events: Event[];
  storeInfo: StoreInfo;
}

class EventService {
  private data: EventsData = eventsData;

  getEvents(): Event[] {
    return this.data.events;
  }

  getStoreInfo(): StoreInfo {
    return this.data.storeInfo;
  }

  addEvent(event: Omit<Event, 'id'>): Event {
    const newEvent: Event = {
      ...event,
      id: this.data.events.length + 1,
      createdAt: new Date().toISOString()
    };
    this.data.events.push(newEvent);
    return newEvent;
  }

  updateEvent(id: number, event: Partial<Event>): Event | null {
    const index = this.data.events.findIndex(e => e.id === id);
    if (index === -1) return null;

    this.data.events[index] = {
      ...this.data.events[index],
      ...event
    };
    return this.data.events[index];
  }

  deleteEvent(id: number): boolean {
    const index = this.data.events.findIndex(e => e.id === id);
    if (index === -1) return false;

    this.data.events.splice(index, 1);
    return true;
  }
}

export const eventService = new EventService(); 