const Course = require('../models/course');
const SubCategory = require('../models/SubCategory');
const fs = require('fs');
const path = require('path');
// const Topic = require('../models/');

// Add a new Course
exports.addCourse = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : '';
    const { name } = req.body;
    const course = new Course({ name, image: imagePath });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Courses with Subcategories
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('subcategories');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : '';
    const { name } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, ...(imagePath && { image: imagePath }) },
      { new: true }
    );

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Course and its subcategories
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (course?.image) {
      fs.unlink(path.join(__dirname, '..', course.image), () => {});
    }

    await SubCategory.deleteMany({ course: req.params.id });

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a Subcategory to a Course
exports.addSubCategory = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : '';
    const { name, course, description, duration ,fees} = req.body;

    const subCategory = new SubCategory({ name, image: imagePath, course, description, duration ,fees });
    await subCategory.save();

    await Course.findByIdAndUpdate(course, { $push: { subcategories: subCategory._id } });

    res.json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Subcategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : '';
    const { name, description, duration , fees } = req.body;

    const updatedSub = await SubCategory.findByIdAndUpdate(
      id,
      { name, description, duration, fees, ...(imagePath && { image: imagePath }) },
      { new: true }
    );

    res.json(updatedSub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const sub = await SubCategory.findByIdAndDelete(req.params.id);
    if (sub?.image) {
      fs.unlink(path.join(__dirname, '..', sub.image), () => {});
    }

    await Course.findByIdAndUpdate(sub.course, {
      $pull: { subcategories: sub._id },
    });

    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a Topic to a Subcategory
exports.addTopic = async (req, res) => {
  const { title} = req.body;

  try {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    subcategory.topics.push({ title });
    await subcategory.save();

    res.status(200).json({ message: "Topic added successfully", subcategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a topic
exports.updateTopic = async (req, res) => {
  const { topicId } = req.params;
  const { title, description, duration } = req.body;

  try {
    const subcategory = await SubCategory.findOne({ "topics._id": topicId });
    if (!subcategory) return res.status(404).json({ message: "Topic not found" });

    const topic = subcategory.topics.id(topicId);
    if (title) topic.title = title;
    if (description) topic.description = description;
    if (duration) topic.duration = duration;

    await subcategory.save();
    res.status(200).json({ message: "Topic updated", subcategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const SubCategory = require('../model/subcategoryModel');

// Get single topic with its subtopics by topicId
exports.getTopicById = async (req, res) => {
  const { topicId } = req.params;

  try {
    // Find subcategory which has this topic
    const subcategory = await SubCategory.findOne({ 'topics._id': topicId });

    if (!subcategory) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Find the specific topic inside the topics array
    const topic = subcategory.topics.id(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found inside subcategory' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ message: 'Server error while fetching topic' });
  }
};


// Delete a topic
// const SubCategory = require('../models/SubCategory');


exports.deleteTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    console.log('Trying to delete topic:', topicId);

    const subCategory = await SubCategory.findOne({ "topics._id": topicId });

    if (!subCategory) {
      console.log('Topic not found in any subcategory');
      return res.status(404).json({ message: 'Topic not found' });
    }


    subCategory.topics = subCategory.topics.filter(
      (topic) => topic._id.toString() !== topicId
    );


    await subCategory.save();

    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};






exports.getSubCategoriesByCourse = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ course: req.params.courseId });
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubCategoriesById = async (req, res) => {
  try {
    _id = req.params.id
    const subCategories = await SubCategory.findById({ _id });
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addSubTopic = async (req, res) => {
  const { topicId } = req.params;
  const { title, videoUrl } = req.body;

  try {
    const subcategory = await SubCategory.findOne({ "topics._id": topicId });
    if (!subcategory) return res.status(404).json({ message: "Topic not found" });

    const topic = subcategory.topics.id(topicId);
    topic.subtopics.push({ title, videoUrl });

    await subcategory.save();
    res.status(200).json({ message: "Subtopic added successfully", topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubTopic = async (req, res) => {
  const { topicId, subTopicId } = req.params;
  const { title, videoUrl } = req.body;

  try {
    const subcategory = await SubCategory.findOne({ "topics._id": topicId });
    if (!subcategory) return res.status(404).json({ message: "Topic not found" });

    const topic = subcategory.topics.id(topicId);
    const subtopic = topic.subtopics.id(subTopicId);
    if (!subtopic) return res.status(404).json({ message: "Subtopic not found" });

    if (title) subtopic.title = title;
    if (videoUrl) subtopic.videoUrl = videoUrl;

    await subcategory.save();
    res.status(200).json({ message: "Subtopic updated", subtopic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubTopic = async (req, res) => {
  const { topicId, subTopicId } = req.params;

  try {
    const subcategory = await SubCategory.findOne({ "topics._id": topicId });
    if (!subcategory) return res.status(404).json({ message: "Topic not found" });

    const topic = subcategory.topics.id(topicId);
    topic.subtopics = topic.subtopics.filter(sub => sub._id.toString() !== subTopicId);

    await subcategory.save();
    res.status(200).json({ message: "Subtopic deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
