const blogModel = require("../models/blogModel");

exports.createBlogController = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const image = req.file; // Access the uploaded file

    if (!title || !image || !userId) {
      return res.status(401).send({
        success: false,
        message: "Please provide title, image, and userId",
      });
    }

    // Save the blog with the file path and userId
    const newBlog = new blogModel({
      title,
      image: `/uploads/${image.filename}`, // Save the file path
      userId,
    });

    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while registering blog",
      error: error.message,
    });
  }
};

exports.getAllBlogController = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const allBlogs = await blogModel.find();
    // Return the response with all blogs
    return res.status(200).send({
      success: true,
      message: "Successfully fetched all blogs",
      data: allBlogs, // Include the blog data in the response
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while fetching blogs",
      error: error.message, // Include the error message for debugging
    });
  }
};

exports.editDataController = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);

    const updatedData = await blogModel.findOneAndUpdate(
      { userId: userId }, // Finding the blog by userId
      req.body, // Updating with the data from the request body
      { new: true } // Return the updated document
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating data",
      error: error.message,
    });
  }
};

exports.getParticularBlog = async (req, res) => {
  try {
    const { userId } = req.params;

    const blog = await blogModel.findOne({ userId: userId }); // Find the blog by userId

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while fetching data",
      error: error.message,
    });
  }
};

// Controller to delete a blog by ID
exports.deleteDataController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await blogModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting data",
      error: error.message,
    });
  }
};
