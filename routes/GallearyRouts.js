// import { addMedia } from "../controller/GallearyController";

const express = require('express')
const router = express.Router();
const upload = require('../middleware/uploadMiddleware.js');

const GallearyController = require('../controller/GallearyController.js');



router.post('/addMedia',upload.single('image'),GallearyController.addMedia)
router.get('/getMedia',GallearyController.getMedia)
router.delete('/deletMedia/:id',GallearyController.deleteMedia)

module.exports = router