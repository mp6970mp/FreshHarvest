import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import { storage } from '../../server/storage';
import { insertEventSchema } from '../../shared/schema';
import cookieParser from 'cookie-parser';
import { requireAdmin, adminLogin, adminLogout, adminStatus } from '../../server/auth';

const app = express();

// Set NODE_ENV to production for the serverless function
process.env.NODE_ENV = 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS configuration for Netlify Functions
app.use((req, res, next) => {
  // Get the origin from the request
  const origin = req.headers.origin;
  
  // Allow the specific origin or any in development
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// API Routes
// Contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Newsletter subscriptions
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    console.log('Newsletter subscription:', { email });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin authentication routes
app.post('/api/admin/login', adminLogin);
app.post('/api/admin/logout', adminLogout);
app.get('/api/admin/status', adminStatus);

// Event API Routes
// Get all events - public route
app.get('/api/events', async (req, res) => {
  try {
    const events = await storage.getEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single event - public route
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

// Create a new event - admin only
app.post('/api/events', requireAdmin, async (req, res) => {
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

// Update an existing event - admin only
app.put('/api/events/:id', requireAdmin, async (req, res) => {
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

// Delete an event - admin only
app.delete('/api/events/:id', requireAdmin, async (req, res) => {
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

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

// Export the serverless function
export const handler = serverless(app);