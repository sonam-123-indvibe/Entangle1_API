const GallearySchema = require('../models/Galleary.js');
const express = require('express');
const mimeType = require('mime-types')

// Add media (photo/video)
// controller/GallearyController.js
const multer = require('multer');

// Add media (photo/video)
exports.addMedia = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const mimeType = file.mimetype;
    const supportedTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime", "video/x-msvideo"];
    
    if (!supportedTypes.includes(mimeType)) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const type = mimeType.startsWith('image/') ? 'image' : 'video';

    const newMedia = new GallearySchema({
      name,
      type,
      media: file.path,
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (err) {
    console.error("Add Media Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteMedia = async (req, res) => {
  try {
    const media = await GallearySchema.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found." });
    }
    res.status(200).json({ message: "Media deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedia = async (req, res) => {
  try {
    const media = await GallearySchema.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
