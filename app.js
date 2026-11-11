
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Gradebook API is running.'
  });
});

// Student routes
app.use('/api/students', studentRoutes);

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
});

// Central error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error.',
    ...(err.errors && { errors: err.errors })
  });
});

export default app;
