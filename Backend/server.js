const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const notesRoutes = require('./routes/notes.route');
const authRoutes = require('./routes/auth.route');
const reminderRoutes = require('./routes/reminder.route');
const profileRoutes = require('./routes/profile.route');
const todoRoutes = require('./routes/todo.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// for agendaJob Cleaning
require('./utils/agendaJobCleaner');

connectDB();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    credentials: true,
  })
)

app.use('/api/auth', authRoutes);
app.use('/api/note', notesRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/todo', todoRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
});