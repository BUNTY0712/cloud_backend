const express = require("express");
const multer = require("multer");
const {
  createBlogController,
  getAllBlogController,
  editDataController,
  deleteDataController,
  getParticularBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the route with file upload
router.post("/create-blog", upload.single("image"), createBlogController);

router.get("/blogs", getAllBlogController);

router.post("/edit-blog/:userId", editDataController); // Edit blog by ID
router.delete("/delete-blog/:id", deleteDataController); // Delete blog by ID
router.get("/getblogbyuserId/:userId", getParticularBlog); // Get blog by userId

module.exports = router;
