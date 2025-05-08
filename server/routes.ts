import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // In a real implementation, you would save this to a database
      // or send an email. For now, we'll just log it.
      console.log('Contact form submission:', { name, email, subject, message });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // API route for newsletter subscriptions
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate input
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      
      // In a real implementation, you would save this to a database
      // or add to an email marketing service
      console.log('Newsletter subscription:', { email });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing newsletter subscription:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Event API Routes
  // Get all events
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getEvents();
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get a single event
  app.get('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      return res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new event
  app.post('/api/events', async (req, res) => {
    try {
      // Parse and validate the request body using our schema
      const result = insertEventSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid event data',
          errors: result.error.format() 
        });
      }
      
      // Create the event in the database
      const event = await storage.createEvent(result.data);
      
      return res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update an existing event
  app.put('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Check if event exists
      const existingEvent = await storage.getEvent(id);
      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      // Parse and validate the request body
      const result = insertEventSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid event data',
          errors: result.error.format() 
        });
      }
      
      // Update the event
      const updatedEvent = await storage.updateEvent(id, result.data);
      
      return res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete an event
  app.delete('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Check if event exists
      const existingEvent = await storage.getEvent(id);
      if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      // Delete the event
      await storage.deleteEvent(id);
      
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
