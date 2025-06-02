const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes.js');
const GallearyRoute = require('./routes/GallearyRouts.js')
const TestimonialRoute = require('./routes/TestimonialRouts.js')
const CertificateRoutes = require('./routes/CerficicateRoutes.js')
const bodyParser = require('body-parser');

const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
// app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', courseRoutes);
app.use('/media', GallearyRoute);
app.use('/testimonial', TestimonialRoute);
app.use('/Certificate',CertificateRoutes );
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
