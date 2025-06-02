// import { addMedia } from "../controller/GallearyController";

const express = require('express')
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js');

const TestimonialRouts = require('../controller/TestimonialsController.js');



router.post('/addTestimonial',upload.single('image'),TestimonialRouts.addTestimonial)
router.get('/getTeatimonial',TestimonialRouts.getTestimonials)
router.put('/updateTeatimonial/:id',upload.single('image'),TestimonialRouts.updateTestimonial)
router.delete('/deletTeatimonial/:id',TestimonialRouts.deleteTestimonial)



module.exports = router