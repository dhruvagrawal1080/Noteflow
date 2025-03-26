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
const app = express();

// for agendaJob Cleaning
require('./utils/agendaJobCleaner');

require('dotenv').config();
connectDB();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

// Handle CORS preflight requests
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

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
)

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

const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
