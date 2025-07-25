require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve ảnh tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Kết nối DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Import routes
const formRoutes = require('./app/routes/form.route');
app.use('/api', formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy ở http://localhost:${PORT}`));
