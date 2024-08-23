// app.js
const express = require('express');
const app = express();
const imageRoutes = require('./routes/imageRoutes');

app.use(express.json());
app.use('/api', imageRoutes);

module.exports = app;
