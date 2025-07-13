const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const imageRoutes = require('./routes/imageRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', imageRoutes);
app.use('/api', scoreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
