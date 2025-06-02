const Testimonial = require("../models/Testimonial");

exports.getTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.json(testimonials);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.addTestimonial = async (req, res) => {
    const { name, rating, review } = req.body;
    const image = req.file;

    if (!image) return res.status(400).json({ error: "No file uploaded" });
  
    const newTestimonial = new Testimonial({
      name,
      image: image.path,
      rating,
      review,
    });
  
    try {
      await newTestimonial.save();
      res.status(201).json(newTestimonial);
    } catch (err) {
      res.status(500).json({ error: 'Error saving testimonial' });
    }
  };

  
  exports.updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, image, rating, review } = req.body;
  
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        { name, image, rating, review },
        { new: true }
      );
  
      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      res.json(updatedTestimonial);
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  };

  
  exports.deleteTestimonial = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
  
      if (!deletedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  