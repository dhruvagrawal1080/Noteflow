const express = require('express');
const connectDB = require('./config/connectDB');
const cloudinaryConnect = require('./config/cloudinary');
const notesRoutes = require('./routes/notes.route');
const authRoutes = require('./routes/auth.route');
const reminderRoutes = require('./routes/reminder.route');
const profileRoutes = require('./routes/profile.route');
const todoRoutes = require('./routes/todo.route');
const contactRoutes = require('./routes/contact.route');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors = require('cors');
require('dotenv').config();

require('./utils/agendaJobCleaner');

const app = express();

// Connect to Database
connectDB();
cloudinaryConnect();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ✅ CORS Headers (for extra security)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/note', notesRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/reach', contactRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
