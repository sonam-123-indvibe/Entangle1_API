const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const path = require('path')


exports.getCertificate =  async (req, res) => {
  try {
    const cert = await Certificate.findOne({ rollNumber: req.params.rollNumber });
    if (!cert) return res.status(404).json({ message: "Certificate not found or course incomplete" });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCertificate =  async (req, res) => {
    try {
      const cert = await Certificate.find();
      if (!cert) return res.status(404).json({ message: "Certificate not found or course incomplete" });
      res.json(cert);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



exports.addCertificate = async (req, res) => {
  try {
    const { rollNumber, name, course, completionDate } = req.body;
    const certFile = req.file;

    if (!certFile) return res.status(400).json({ message: 'Certificate file required' });

    const newCert = new Certificate({
      rollNumber,
      name,
      course,
      completionDate,
      certificateUrl: `/uploads/certificates/${certFile.filename}`,
    });

    await newCert.save();
    res.status(201).json({ message: 'Certificate added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletCertificate = async (req, res) => {
    try {
      const deleted = await Certificate.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      return res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ error: "Server error while deleting certificate" });
    }
  };


  exports.updateCertificate = async (req, res) => {
    try {
      const { rollNumber, name, course, completionDate } = req.body;
      const certFile = req.file;
  
      // Find existing certificate by ID
      const cert = await Certificate.findById(req.params.id);
      if (!cert) {
        return res.status(404).json({ message: "Certificate not found" });
      }
  
     
      cert.rollNumber = rollNumber || cert.rollNumber;
      cert.name = name || cert.name;
      cert.course = course || cert.course;
      cert.completionDate = completionDate || cert.completionDate;
  
     
      if (certFile) {
        cert.certificateUrl = `/uploads/certificates/${certFile.filename}`;
      }
  
      await cert.save();
      res.status(200).json({ message: "Certificate updated successfully", cert });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  



