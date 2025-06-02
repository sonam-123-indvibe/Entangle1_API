const express = require('express');
const router = express.Router();
const CertificateRoutes = require('../controller/certificateController.js');
const uploadcertificate = require('../middleware/uploadCertificateMiddleware.js');

router.post('/add', uploadcertificate.single('certificateFile'), CertificateRoutes.addCertificate);
router.put('/certificate/:id', uploadcertificate.single('certificate'), CertificateRoutes.updateCertificate);
router.get('/getCertificate/:rollNumber', CertificateRoutes.getCertificate);
router.get('/getAllCertificate',CertificateRoutes.getAllCertificate)
router.delete('/deletCertificate/:id',CertificateRoutes.deletCertificate)
module.exports = router;
