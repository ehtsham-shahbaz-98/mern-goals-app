const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require('./middleware/errorMiddleware');
const goalRoutes = require('./routes/goalRoutes');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express app is running 🔥 on ${port}`);
});

// console.log('Mission: MERN Stack 🔥');
