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

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
});