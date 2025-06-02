const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController.js');
const multer = require('multer');
const upload = require('../middleware/uploadMiddleware.js');

// COURSE ROUTES
router.post('/course', upload.single('image'), courseController.addCourse);
router.get('/courses', courseController.getCourses);
router.put('/course/:id', upload.single('image'), courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);

// TOPIC ROUTES
router.post('/addTopic/:id', courseController.addTopic); // Add topic to subcategory/course
router.put('/topicUpdate/:topicId', courseController.updateTopic);
router.delete('/topicDeleate/:topicId', courseController.deleteTopic);
router.get('/topic/:topicId', courseController.getTopicById);

// SUBCATEGORY ROUTES
router.post('/subcategory', upload.single('image'), courseController.addSubCategory);
router.get('/subcategories/:courseId', courseController.getSubCategoriesByCourse);
router.put('/subcategory/:id', upload.single('image'), courseController.updateSubCategory);
router.delete('/subcategory/:id', courseController.deleteSubCategory);
router.get('/getsubCaterory/:id', courseController.getSubCategoriesById);

// Sub Toic 

router.post('/topic/:topicId/subtopic', courseController.addSubTopic);
router.put('/topic/:topicId/subtopic/:subTopicId', courseController.updateSubTopic);
router.delete('/topic/:topicId/subtopic/:subTopicId', courseController.deleteSubTopic);




module.exports = router;
