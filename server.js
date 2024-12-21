   // server.js
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const authRoutes = require('./routes/auth');
   require('dotenv').config();

   const app = express();
   app.use(bodyParser.json());

   // اتصال به MongoDB
   mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error(err));

   // استفاده از روت‌های auth
   app.use('/api/auth', authRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });